import { Injectable } from '@angular/core';
import { Bag } from '../../shared/models/bag';
import { Tag } from '../../shared/models/Tag';
@Injectable({
  providedIn: 'root'
})
export class BagService {
  static getBagById(arg0: any): Bag {
    throw new Error('Method not implemented.');
  }

  constructor() { }


  getBagById(id:number) :Bag  | undefined{
    return this.getAll().find(bag => bag.id == id)!;
  }
  
  getAllBagsBySearchTerm(searchTerm:string) :Bag[]{
    return this.getAll().filter(bag => bag.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }


  getAllTags():Tag[]{
    return[
      {name: 'All', count: 14},
      {name: 'homemade', count: 3},
      {name: 'made', count: 2},
      {name: 'blue', count: 3},
      {name: 'spring', count: 1},
      {name: 'littlebag', count: 2},
    ]
  }

  getAllBagsByTag(tag: string): Bag[] {
    return tag == "All" ? this.getAll() : this.getAll().filter(bag => bag.tags?.includes(tag));
  }
  
  
  getAll():Bag[]{
    return[
     {
      id:1,
      name:'Bag Aura',
      price:5,
      cookTime: '10-20',
      favorite: false,
      origins: ['persia','middle east', 'china'],
      stars: 4.7,
      imageUrl: '/assets/images/bags/bag1.jpg',
      tags: ['homemade', 'made'],
     },
     {
      id:2,
      name:'Bag blu',
      price:2,
      cookTime: '10-20',
      favorite: true,
      origins: ['persia','middle east', 'china'],
      stars: 4.7,
      imageUrl: '/assets/images/bags/bag2.jpg',
      tags: ['blue', 'bag'],
     },
     {
      id:3,
      name:'Pochette you',
      price: 4,
      cookTime: '10-20',
      favorite: false,
      origins: ['persia','middle east', 'china'],
      stars: 4.7,
      imageUrl: '/assets/images/bags/bag3.jpg',
      tags: ['homemade', 'littlebag'],
     },
     
     {
      id:4,
      name:'Bag Persia',
      price: 6,
      cookTime: '10-20',
      favorite: true,
      origins: ['persia','middle east', 'china'],
      stars: 4.7,
      imageUrl: '/assets/images/bags/bag4.jpg',
      tags: ['made', 'blue'],
     },
     {
      id:5,
      name:'Bag Aura',
      price:3,
      cookTime: '10-20',
      favorite: true,
      origins: ['persia','middle east', 'china'],
      stars: 4.7,
      imageUrl: '/assets/images/bags/bag5.jpg',
      tags: ['spring', 'blue'],
     },
     {
      id:6,
      name:'Bag Aura',
      price: 6,
      cookTime: '10-20',
      favorite: true,
      origins: ['persia','middle east', 'china'],
      stars: 4.7,
      imageUrl: '/assets/images/bags/bag6.jpg',
      tags: ['homemade', 'littlebag'],
     },
    ]
    
  }
}
