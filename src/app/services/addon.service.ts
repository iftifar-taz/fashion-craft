import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Addon } from '../models/addon';

@Injectable({
  providedIn: 'root'
})
export class AddonService {

  private selectedAddon: BehaviorSubject<Addon> = new BehaviorSubject<Addon>({
    url: '',
    width: 0,
    height: 0
  });
  selectedAddon$: Observable<Addon> = this.selectedAddon.asObservable();

  constructor(private http: HttpClient) { }

  getAddons(): Observable<Addon[]> {
    return this.http.get<Addon[]>('/assets/jsons/addons.json');
  }

  updateSelectedAddon(addon: Addon): void {
    this.selectedAddon.next(addon);
  }
}
