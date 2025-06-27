import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // URL de l'API des utilisateurs
  private readonly _URL : string = 'https://lootopia-backend.onrender.com/api/user/';
  private users : UserModel[] = [];

  constructor(private http: HttpClient) { }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error("Error user: " + error);
    return of(errorValue);
  }

  public getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this._URL).pipe(
      tap((response) => this.log("Get All Hunts : " + response)),
      catchError((error) => this.handleError(error, this.users))
    );
  }

  public getById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this._URL}${id}/`).pipe(
      tap((response) => this.log("Get User by ID : " + response)),
      catchError((error) => this.handleError(error, null))
    );
  }
}
