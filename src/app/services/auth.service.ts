import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { AuthInterface } from '../interfaces/auth.interface';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuth.asObservable();

  private BASE_URL = 'https://api.escuelajs.co/api/v1/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<AuthInterface>(`${this.BASE_URL}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
        })
      );
  }

  getProfile() {
    return this.http.get<UserInterface>(`${this.BASE_URL}/profile`);
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth.next(isAuth);
  }
}
