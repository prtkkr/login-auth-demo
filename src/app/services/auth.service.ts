import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post('/api/authenticate', credentials)
      .pipe(map((response: any) => {
            if (response) {
              localStorage.setItem('token', response.token);
              return true;
            }
            return false;
          })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const tokenExpirationDate = new JwtHelperService().getTokenExpirationDate(token);
    const isExpired = new JwtHelperService().isTokenExpired(token);
    //  console.log('Ex. date: ', tokenExpirationDate);
    //  console.log('isExpired: ', isExpired);
    return !isExpired;
  }

  get CurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    return new JwtHelperService().decodeToken(token);
  }
}
