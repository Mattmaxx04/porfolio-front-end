import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../entities/experience';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiServerUrl}/experience/all`);
  }

  public updateExperience(experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiServerUrl}/experience/update`, experience);
  }

  public addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiServerUrl}/experience/add`, experience);
  }

  public deleteExperience(experienceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/experience/delete/${experienceId}`);
  }
}
