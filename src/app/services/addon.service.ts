import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddonService {

  private selectedAddon: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedAddon$: Observable<string> = this.selectedAddon.asObservable();

  constructor(private http: HttpClient) { }

  getAddons(): Observable<string[]> {
    return this.http.get<string[]>('/assets/jsons/addons.json');
  }

  updateSelectedAddon(addon: string): void {
    this.selectedAddon.next(addon);
  }
}
