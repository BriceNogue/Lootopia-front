import { Injectable } from '@angular/core';
import { HuntModel } from '../models/hunt.model';

@Injectable({
  providedIn: 'root'
})
export class HuntsService {

  constructor() { }

  private huntsList : HuntModel[] = [
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
  ]

  public getAll(): HuntModel[] {
    return this.huntsList;
  }

  public getById(id: number): HuntModel | undefined {
    return this.huntsList.find(hunt => hunt.id === id);
  }
}
