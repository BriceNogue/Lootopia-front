import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { GetHuntModel } from '../models/hunt.model';
import { HuntsService } from './hunts.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // URL de l'API des utilisateurs
  private readonly _URL : string = 'https://lootopia-backend.onrender.com/api/user/';
  private readonly _HuntsURL : string = 'https://lootopia-backend.onrender.com/api/chasse/';
  private users : UserModel[] = [];
  private huntsList : GetHuntModel[] = [];

  constructor(private http: HttpClient, private huntService: HuntsService) { }

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

  public getUserHunts(pseudo: string): Observable<GetHuntModel[]> {
    /*return this.huntService.getAll().pipe(
      tap((response) => this.log("Get Hunts By Creator : " + response)),
      catchError((error) => this.handleError(error, [])),
      // Filter hunts by creator pseudo
      // Use map to filter the array of hunts
      // (assuming getAll() returns Observable<HuntModel[]>)
      // If getAll() returns Observable<HuntModel>, adjust accordingly
      // Here, we assume getAll() returns Observable<HuntModel[]>
      // and filter the array using Array.prototype.filter
      // import 'map' from rxjs/operators if not already imported
      // import { map } from 'rxjs/operators';
      //map((hunts: HuntModel[]) => hunts.filter(hunt => hunt.createur === pseudo))
    );*/

    return this.huntService.getAll().pipe(
      map((hunts: GetHuntModel[]) => hunts.filter(hunt => hunt.createur === pseudo)),
      tap((response) => this.log("Get Hunts By Creator : " + response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  public create(user: UserModel) {
    return this.http.post<UserModel>(this._URL + 'create/', user).pipe(
      tap((response) => this.log('Create User : ' + response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public update(id: number, user: UserModel) {
    return this.http.put<UserModel>(`${this._URL}${id}/edit/`, user).pipe(
      tap((response) => this.log('Update User : ' + response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public delete(id: number) {
    return this.http.delete(`${this._URL}${id}/delete/`).pipe(
      tap((response) => this.log('Delete User : ' + response)),
      catchError((error) => this.handleError(error, null))
    );
  }
}
