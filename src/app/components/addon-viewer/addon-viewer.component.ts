import { Component, OnInit, ViewChild, AfterViewInit, HostListener, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { InitialCoordinates, Coordinate } from 'src/app/models/coordinates';
import { Sign, Angle } from 'src/app/models/angle';
import { BoundingInformation } from 'src/app/models/bounding-information';
import { AddonInformation } from 'src/app/models/addon-information';

@Component({
  selector: '.app-addon-viewer',
  templateUrl: './addon-viewer.component.html',
  styleUrls: ['./addon-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddonViewerComponent implements OnInit, AfterViewInit {

  private rotatorHeight = -20;
  @ViewChild('addonViewerContainer', {static: false}) addonViewerContainer;
  @ViewChild('imageContainer', {static: false}) imageContainer;

  @Input() addon: string;
  @Input() viewerCoordinate: BoundingInformation;

  @Output() deleteAddon: EventEmitter<string> = new EventEmitter<string>();

  private addonInformation: AddonInformation;
  private initialRotatorCoordinates: InitialCoordinates;
  private initialDraggerCoordinates: InitialCoordinates;
  private mouseLastKnownCoordinate: Coordinate;
  private rotating = false;
  private dragging = false;
  private previousAngle = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.imageContainer.nativeElement.setAttribute('style', `background-image: url('${this.addon}');`);
    this.setAddonInformation();
    this.updateAddon();
  }

  onResetClick(): void {
    this.resetAddonInformation();
  }

  onDeleteClick(): void {
    this.deleteAddon.emit(this.addon);
  }

  onRotatorMouseDown(event: MouseEvent): void {
    this.initialRotatorCoordinates = {
      mouse: {
        positionX: event.clientX,
        positionY: event.clientY,
      },
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
    this.initialDraggerCoordinates = {
      mouse: {
        positionX: event.clientX,
        positionY: event.clientY,
      },
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
    if (this.initialRotatorCoordinates) {
      this.previousAngle = this.addonInformation.angle;
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
    if (this.initialRotatorCoordinates) {
      const angle: Angle =
        this.findAngle(this.initialRotatorCoordinates.mouse, this.mouseLastKnownCoordinate, this.initialRotatorCoordinates.addon);
      const currentAngle = angle.sign ===  Sign.POSITIVE ? angle.value : 360 - angle.value;
      this.addonInformation.angle = (this.previousAngle + currentAngle) % 360;
    } else {
      this.addonInformation.angle = 0;
    }
  }

  private setDisplayTop(): void {
    if (this.initialDraggerCoordinates) {
      let positionY = this.initialDraggerCoordinates.addon.positionY
      + this.mouseLastKnownCoordinate.positionY
      - this.initialDraggerCoordinates.mouse.positionY;
      positionY = positionY < this.rotatorHeight ? this.rotatorHeight : positionY;
      const allowedPositionY = this.viewerCoordinate.height - this.imageContainer.nativeElement.offsetParent.offsetHeight;
      positionY = positionY > allowedPositionY ? allowedPositionY : positionY;
      this.addonInformation.top = positionY;
    } else {
      this.addonInformation.top = 0;
    }
  }

  private setDisplayLeft(): void {
    if (this.initialDraggerCoordinates) {
      let positionX = this.initialDraggerCoordinates.addon.positionX
        + this.mouseLastKnownCoordinate.positionX
        - this.initialDraggerCoordinates.mouse.positionX;
      positionX = positionX < 0 ? 0 : positionX;
      const allowedPositionY = this.viewerCoordinate.width - this.imageContainer.nativeElement.offsetParent.offsetWidth;
      positionX = positionX > allowedPositionY ? allowedPositionY : positionX;
      this.addonInformation.left = positionX;
    } else {
      this.addonInformation.left = 0;
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
    if (this.addonInformation) {
      this.addonViewerContainer.nativeElement.setAttribute('style',
        `transform: rotate(${this.addonInformation.angle}deg);
        top: ${this.addonInformation.top}px;
        left: ${this.addonInformation.left}px;`);
    }
  }

  private setAddonInformation(): void {
    this.addonInformation = {
      angle: 0,
      top: this.imageContainer.nativeElement.offsetParent.offsetTop,
      left: this.imageContainer.nativeElement.offsetParent.offsetLeft
    };
  }

  private resetAddonInformation(): void {
    this.addonViewerContainer.nativeElement.setAttribute('style',
      `transform: rotate(0deg);
      top: calc(50% - 60px);
      left: calc(50% - 50px)`);

    this.setAddonInformation();
  }
}
