import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = 'https://api.escuelajs.co/api/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  create(dto: UserInterface) {
    return this.http.post<UserInterface>(this.BASE_URL, dto);
  }

  getAll() {
    return this.http.get<UserInterface[]>(this.BASE_URL);
  }
}
