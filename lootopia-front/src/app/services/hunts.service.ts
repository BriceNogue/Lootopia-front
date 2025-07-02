import { Injectable } from '@angular/core';
import { GetHuntModel, CreateHuntModel } from '../models/hunt.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuntsService {

  private readonly _HuntsURL : string = 'https://lootopia-backend.onrender.com/api/chasse/'; // URL de l'API des chasses au trésor

  constructor(private http: HttpClient) { }

  private log (response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error("Error hunt: " + error);
    return of(errorValue);
  }

  private huntsList : GetHuntModel[] = [
    /*
    {
      id: 1,
      title: 'Chasse aux oeufs de Pâques',
      description: 'Venez découvrir les oeufs cachés dans la nature ! Des récompenses à la clé ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, doloribus ipsa? Velit ut, distinctio, earum autem sed magnam optio doloribus odit enim ratione excepturi repudiandae sit eos adipisci ipsum atque.',
      huntImage: 'assets/images/dashboard-card-image.svg',
      startDate: new Date('2025-10-29'),
      endDate: new Date('2025-10-31'),
      difficulty: 'Facile',
      price: 10,
      reward: 100,
      isPrivate: false,
      isCompleted: false,
      participants: 0,
      maxParticipants: 10,
      location: 'Paris',
      creatorId: 1,
      createdAt: new Date('2025-05-01')
    },
    {
      id: 2,
      title: 'Chasse à la truffe',
      description: 'Venez découvrir les oeufs cachés dans la nature ! Des récompenses à la clé ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, doloribus ipsa? Velit ut, distinctio, earum autem sed magnam optio doloribus odit enim ratione excepturi repudiandae sit eos adipisci ipsum atque.',
      huntImage: 'assets/images/dashboard-card-image.svg',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-03'),
      difficulty: 'Moyen',
      price: 15,
      reward: 200,
      isPrivate: false,
      isCompleted: false,
      participants: 0,
      maxParticipants: 5,
      location: 'Lyon',
      creatorId: 2,
      createdAt: new Date('2025-06-15')
    },
    {
      id: 3,
      title: 'Chasse au trésor 2',
      description: 'Venez découvrir les oeufs cachés dans la nature ! Des récompenses à la clé ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, doloribus ipsa? Velit ut, distinctio, earum autem sed magnam optio doloribus odit enim ratione excepturi repudiandae sit eos adipisci ipsum atque.',
      huntImage: 'assets/images/dashboard-card-image.svg',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-02'),
      difficulty: 'Moyen',
      price: 11,
      reward: 200,
      isPrivate: false,
      isCompleted: false,
      participants: 0,
      maxParticipants: 5,
      location: 'Lyon',
      creatorId: 2,
      createdAt: new Date('2025-05-15')
    },
    {
      id: 4,
      title: 'Chasse au trésor 2',
      description: 'Venez découvrir les oeufs cachés dans la nature ! Des récompenses à la clé ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, doloribus ipsa? Velit ut, distinctio, earum autem sed magnam optio doloribus odit enim ratione excepturi repudiandae sit eos adipisci ipsum atque.',
      huntImage: 'assets/images/dashboard-card-image.svg',
      startDate: new Date('2025-8-11'),
      endDate: new Date('2025-8-12'),
      difficulty: 'Moyen',
      price: 12,
      reward: 200,
      isPrivate: true,
      isCompleted: false,
      participants: 0,
      maxParticipants: 5,
      location: 'Lyon',
      creatorId: 2,
      createdAt: new Date('2025-04-15')
    },
    {
      id: 5,
      title: 'Chasse au trésor 2',
      description: 'Venez découvrir les oeufs cachés dans la nature ! Des récompenses à la clé ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, doloribus ipsa? Velit ut, distinctio, earum autem sed magnam optio doloribus odit enim ratione excepturi repudiandae sit eos adipisci ipsum atque.',
      huntImage: 'assets/images/dashboard-card-image.svg',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-09-03'),
      difficulty: 'Moyen',
      price: 9,
      reward: 200,
      isPrivate: false,
      isCompleted: false,
      participants: 0,
      maxParticipants: 5,
      location: 'Lyon',
      creatorId: 2,
      createdAt: new Date('2025-05-15')
    },
    {
      id: 6,
      title: 'Chasse au trésor 2',
      description: 'Venez découvrir les oeufs cachés dans la nature ! Des récompenses à la clé ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, doloribus ipsa? Velit ut, distinctio, earum autem sed magnam optio doloribus odit enim ratione excepturi repudiandae sit eos adipisci ipsum atque.',
      huntImage: 'assets/images/dashboard-card-image.svg',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-30'),
      difficulty: 'Moyen',
      price: 13,
      reward: 200,
      isPrivate: true,
      isCompleted: false,
      participants: 0,
      maxParticipants: 5,
      location: 'Lyon',
      creatorId: 2,
      createdAt: new Date('2025-06-15')
    }
    */
  ]

  public getAll(): Observable<GetHuntModel[]> {
    return this.http.get<GetHuntModel[]>(this._HuntsURL).pipe(
      tap((response) => this.log("Get All Hunts : " + response)),
      catchError((error) => this.handleError(error, this.huntsList))
    );
  }

  public getById(id: number): Observable<GetHuntModel | undefined> {
    return this.http.get<GetHuntModel>(`${this._HuntsURL}${id}`).pipe(
      tap((response) => this.log("Get Hunt By Id : " + response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  public getByCreator(pseudo: string): Observable<GetHuntModel[]> {
    return this.http.get<GetHuntModel[]>(`${this._HuntsURL}`).pipe(
      tap((response) => this.log("Get Hunts By Creator : " + response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  public create(hunt: CreateHuntModel): Observable<CreateHuntModel> {
    return this.http.post<CreateHuntModel>(this._HuntsURL+"create/", hunt).pipe(
      tap((response) => this.log("Create Hunt : " + response)),
      catchError((error) => this.handleError(error, hunt))
    );
  }

  public update(huntId: number, hunt: CreateHuntModel): Observable<CreateHuntModel> {
    return this.http.put<CreateHuntModel>(`${this._HuntsURL}${huntId}/edit/`, hunt).pipe(
      tap((response) => this.log("Update Hunt : " + response)),
      catchError((error) => this.handleError(error, hunt))
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this._HuntsURL}${id}delete/`).pipe(
      tap(() => this.log(`Delete Hunt with ID: ${id}`)),
      catchError((error) => this.handleError(error, undefined))
    );
  }
}
