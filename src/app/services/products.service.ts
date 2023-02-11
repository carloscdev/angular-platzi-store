import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product.interface';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private BASE_URL = 'https://api.escuelajs.co/api/v1';

  constructor(
    private http: HttpClient
  ) { }

  getProductList(limit: number = 10, offset: number = 0) {
    return this.http.get<ProductInterface[]>(`${this.BASE_URL}/products`, { params: { limit, offset }});
  }

  getProductDetail(id: string) {
    return this.http.get<ProductInterface>(`${this.BASE_URL}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError(() => 'Ups Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => 'NO estás permitido para ingresar');
        }
        return throwError(() => 'Ups Algo Salió Mal');
      })
    );
  }

  getProductByCategory(categoryId: string, limit: number = 10, offset: number = 0) {
    return this.http.get<ProductInterface[]>(`${this.BASE_URL}/categories/${categoryId}/products`, { params: { limit, offset }});
  }

  getProductById(productId: string) {
    return this.http.get<ProductInterface>(`${this.BASE_URL}/products/${productId}`);
  }
}
