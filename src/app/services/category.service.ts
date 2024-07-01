import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService { 

  private apiUrl = `${environment.apiUrl}/categories`; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }


  CreateNewCategory(category : any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, category);
  }

  GetAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/allCategories`);
  }

  GetCategoryById(id: number, ): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  UpdateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category);
  }

  DeleteCategoryById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
