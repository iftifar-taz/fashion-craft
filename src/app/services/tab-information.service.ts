import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TabInformation } from '../models/tab-information';

@Injectable({
  providedIn: 'root'
})
export class TabInformationService {

  constructor(private http: HttpClient) { }

  getTabInformations(): Observable<TabInformation[]> {
    return this.http.get<TabInformation[]>('/assets/jsons/tab-informations.json');
  }
}
