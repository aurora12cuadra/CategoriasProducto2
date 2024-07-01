import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/allProducts`);
  }

  GetProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  CreateProduct(product: Product): Observable<Product> {
    return this.http.post<any>(`${this.apiUrl}/`, product);
  }

  UpdateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  DeleteProduct(id: number): Observable<Product> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
