import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtResponse } from './response/JwtResponse';
import { AuthLoginInfo } from './LoginInfo';
import { SignUpInfo } from './SignUpInfo';

const httpOptions = {headers: 
  new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURI = 'http://localhost:8080/api/auth';
  

  constructor(private http: HttpClient) { }

  login(credentials: AuthLoginInfo): Observable <JwtResponse> {
    return this.http.post<JwtResponse>(this.baseURI + '/login', credentials, httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.baseURI + '/signup', info, httpOptions);
  }
}
