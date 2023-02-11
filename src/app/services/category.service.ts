import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BASE_URL = 'https://api.escuelajs.co/api/v1/categories';

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList(limit: number = 10, offset: number = 0){
    let params = new HttpParams();
    params = params.set('limit', limit);
    params = params.set('offset', offset);
    return this.http.get<CategoryInterface[]>(this.BASE_URL, {params})
  }
}
