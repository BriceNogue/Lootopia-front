import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HuntModel } from '../models/hunt.model';

@Injectable({
  providedIn: 'root'
})
export class HuntsService {
  private apiUrl = 'https://lootopia-backend.onrender.com'; // Adapter selon le endpoint Swagger

  constructor(private http: HttpClient) { }

  getAll(): Observable<HuntModel[]> {
    return this.http.get<HuntModel[]>(`${this.apiUrl}/chasses`);
  }

  getById(id: number): Observable<HuntModel> {
    return this.http.get<HuntModel>(`${this.apiUrl}/chasses/${id}`);
  }

  create(hunt: Partial<HuntModel>): Observable<HuntModel> {
    return this.http.post<HuntModel>(`${this.apiUrl}/chasses`, hunt);
  }

  update(id: number, hunt: Partial<HuntModel>): Observable<HuntModel> {
    return this.http.put<HuntModel>(`${this.apiUrl}/chasses/${id}`, hunt);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/chasses/${id}`);
  }
}
