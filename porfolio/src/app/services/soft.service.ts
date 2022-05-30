import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Soft } from '../entities/soft';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoftService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSofts(): Observable<Soft[]> {
    return this.http.get<Soft[]>(`${this.apiServerUrl}/soft/all`);
  }

  public updateSoft(soft: Soft): Observable<Soft> {
    return this.http.put<Soft>(`${this.apiServerUrl}/soft/update`, soft);
  }

  public addSoft(soft: Soft): Observable<Soft> {
    return this.http.post<Soft>(`${this.apiServerUrl}/soft/add`, soft);
  }

  public deleteSoft(softId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/soft/delete/${softId}`);
  }
}

