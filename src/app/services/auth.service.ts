import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../interfaces/user.interface';
import { AuthInterface } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'https://api.escuelajs.co/api/v1/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<AuthInterface>(`${this.BASE_URL}/login`, { email, password });
  }

  getProfile(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<UserInterface>(`${this.BASE_URL}/profile`, {
      headers
    });
  }
}
