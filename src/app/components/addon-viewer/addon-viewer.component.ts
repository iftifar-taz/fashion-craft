import { Component, OnInit, ViewChild, AfterViewInit, HostListener, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { InitialCoordinates, Coordinate } from 'src/app/models/coordinates';
import { Sign, Angle } from 'src/app/models/angle';
import { BoundingCoordinates } from 'src/app/models/bounding-coordinates';
import { SelectedAddon } from 'src/app/models/selected-addon';
import { Addon } from 'src/app/models/addon';

@Component({
  selector: '.app-addon-viewer',
  templateUrl: './addon-viewer.component.html',
  styleUrls: ['./addon-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddonViewerComponent implements OnInit, AfterViewInit {

  @ViewChild('addonViewerContainer', {static: false}) addonViewerContainer;
  @ViewChild('imageContainer', {static: false}) imageContainer;

  @Input() addon: Addon;
  @Input() viewerCoordinate: BoundingCoordinates;

  @Output() deleteAddon: EventEmitter<Addon> = new EventEmitter<Addon>();

  private selectedAddon: SelectedAddon;
  private initialCoordinates: InitialCoordinates;
  private mouseLastKnownCoordinate: Coordinate;
  private rotating = false;
  private dragging = false;
  private previousAngle = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.imageContainer.nativeElement.setAttribute('style', `background-image: url('${this.addon.url}');`);
    this.setSelectedAddon();
    this.updateAddon();
  }

  onResetClick(): void {
    this.resetSelectedAddon();
  }

  onDeleteClick(): void {
    this.deleteAddon.emit(this.addon);
  }

  onRotatorMouseDown(event: MouseEvent): void {
    this.initialCoordinates = {
      mouse: this.getEventMouseCoordinate(event),
      addon: {
        positionX: this.viewerCoordinate.left + this.imageContainer.nativeElement.offsetParent.offsetLeft
          + this.imageContainer.nativeElement.offsetParent.offsetWidth / 2,
        positionY: this.viewerCoordinate.top + this.imageContainer.nativeElement.offsetParent.offsetTop
          + this.imageContainer.nativeElement.offsetParent.offsetHeight / 2,
      }
    };
    this.rotating = true;
  }

  onDragMouseDown(event: MouseEvent): void {
    this.initialCoordinates = {
      mouse: this.getEventMouseCoordinate(event),
      addon: {
        positionX: this.imageContainer.nativeElement.offsetParent.offsetLeft,
        positionY: this.imageContainer.nativeElement.offsetParent.offsetTop,
      }
    };
    this.dragging = true;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event): void {
    this.mouseLastKnownCoordinate = {
      positionX: event.clientX,
      positionY: event.clientY,
    };

    this.updateAddon();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event): void {
    this.rotating = false;
    this.dragging = false;
    if (this.initialCoordinates) {
      this.previousAngle = this.selectedAddon.angle;
    }
  }

  private findAngle(p0: Coordinate, p1: Coordinate, c: Coordinate): Angle {
    const p0c: number = Math.sqrt(Math.pow(c.positionX - p0.positionX, 2) + Math.pow(c.positionY - p0.positionY, 2));
    const p1c: number = Math.sqrt(Math.pow(c.positionX - p1.positionX, 2) + Math.pow(c.positionY - p1.positionY, 2));
    const p0p1: number = Math.sqrt(Math.pow(p1.positionX - p0.positionX, 2) + Math.pow(p1.positionY - p0.positionY, 2));
    const angle: number = Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c));
    const sign: number =
    (p0.positionX - c.positionX) * (p1.positionY - c.positionY) - (p0.positionY - c.positionY) * (p1.positionX - c.positionX);
    return {
      value: angle * (180 / Math.PI),
      sign: sign > 0 ? Sign.POSITIVE : Sign.NEGETIVE
    };
  }

  private setDisplayAngle(): void {
    if (this.initialCoordinates) {
      const angle: Angle =
        this.findAngle(this.initialCoordinates.mouse, this.mouseLastKnownCoordinate, this.initialCoordinates.addon);
      const currentAngle = angle.sign ===  Sign.POSITIVE ? angle.value : 360 - angle.value;
      this.selectedAddon.angle = (this.previousAngle + currentAngle) % 360;
    } else {
      this.selectedAddon.angle = 0;
    }
  }

  private setDisplayTop(): void {
    if (this.initialCoordinates) {
      let positionY = this.initialCoordinates.addon.positionY
      + this.mouseLastKnownCoordinate.positionY
      - this.initialCoordinates.mouse.positionY;
      positionY = positionY < 0 ? 0 : positionY;
      const allowedPositionY = this.viewerCoordinate.height - this.imageContainer.nativeElement.offsetParent.offsetHeight;
      positionY = positionY > allowedPositionY ? allowedPositionY : positionY;
      this.selectedAddon.top = positionY;
    } else {
      this.selectedAddon.top = 0;
    }
  }

  private setDisplayLeft(): void {
    if (this.initialCoordinates) {
      let positionX = this.initialCoordinates.addon.positionX
        + this.mouseLastKnownCoordinate.positionX
        - this.initialCoordinates.mouse.positionX;
      positionX = positionX < 0 ? 0 : positionX;
      const allowedPositionY = this.viewerCoordinate.width - this.imageContainer.nativeElement.offsetParent.offsetWidth;
      positionX = positionX > allowedPositionY ? allowedPositionY : positionX;
      this.selectedAddon.left = positionX;
    } else {
      this.selectedAddon.left = 0;
    }
  }

  private updateAddon(): void {
    if (this.rotating) {
      this.setDisplayAngle();
    }

    if (this.dragging) {
      this.setDisplayLeft();
      this.setDisplayTop();
    }
    if (this.selectedAddon) {
      this.addonViewerContainer.nativeElement.setAttribute('style',
        `transform: rotate(${this.selectedAddon.angle}deg);
        top: ${this.selectedAddon.top}px;
        left: ${this.selectedAddon.left}px;`);
    }
  }

  private setSelectedAddon(): void {
    this.selectedAddon = {
      angle: 0,
      top: this.imageContainer.nativeElement.offsetParent.offsetTop,
      left: this.imageContainer.nativeElement.offsetParent.offsetLeft
    };
  }

  private resetSelectedAddon(): void {
    this.addonViewerContainer.nativeElement.setAttribute('style',
      `transform: rotate(0deg);
      top: calc(50% - 60px);
      left: calc(50% - 50px)`);

    this.setSelectedAddon();
    this.previousAngle = 0;
  }

  private getEventMouseCoordinate(event: MouseEvent): Coordinate {
    return {
      positionX: event.clientX,
      positionY: event.clientY,
    };
  }
}
