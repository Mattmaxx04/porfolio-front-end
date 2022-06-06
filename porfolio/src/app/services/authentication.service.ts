import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser } from '../entities/new-user'
import { LoginUser } from '../entities/login-user';
import { JwtDto } from '../entities/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = environment.apiAuthUrl;


  constructor(private httpClient: HttpClient) { }

  /*cambiar this.authURL por this.URL*/
  public neww(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.url + 'neww', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.url + 'login', loginUser);
  }

}
