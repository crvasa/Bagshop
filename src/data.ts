
import { Bag } from "./app/shared/models/bag";
import { Tag } from "./app/shared/models/Tag";


export const sample_bags: Bag[] =[{
  
    id:1,
    name:'Summer Bag',
    price:50,
    cookTime: '2 weeks',
    favorite: false,
    origins: ['cordino','estate'],
    stars: 4.7,
    imageUrl: '/assets/images/bags/bag1.jpg',
    tags: ['homemade', 'cordino'],
   },
   {
    id:2,
    name:'Rose Bag',
    price:2,
    cookTime: '5 hours',
    favorite: true,
    origins: ['estate','fettuccia'],
    stars: 4.7,
    imageUrl: '/assets/images/bags/bag2.jpg',
    tags: ['homemade','fettuccia'],
   },
   {
    id:3,
    name:'Positive Bag',
    price: 4,
    cookTime: '6 hours',
    favorite: false,
    origins: ['fettuccia', 'autunno'],
    stars: 4.7,
    imageUrl: '/assets/images/bags/bag3.jpg',
    tags: ['made', 'cordino'],
   },
   
   {
    id:4,
    name:'Autumn Bag',
    price: 6,
    cookTime: '5 hours',
    favorite: true,
    origins: ['autunno'],
    stars: 4.7,
    imageUrl: '/assets/images/bags/bag4.jpg',
    tags: ['homemade','fettuccia'],
   },
   {
    id:5,
    name:'Violet Bag',
    price:3,
    cookTime: '5 days',
    favorite: true,
    origins: ['fettuccia','estate'],
    stars: 4.7,
    imageUrl: '/assets/images/bags/bag5.jpg',
    tags: ['made','cordino'],
   },
   {
    id:6,
    name:'Bag Aura',
    price: 6,
    cookTime: '2 days',
    favorite: true,
    origins: ['cordino'],
    stars: 4.7,
    imageUrl: '/assets/images/bags/bag6.jpg',
    tags: ['homemade','littlebag'],
   },
  ]

 export const sample_tags: Tag[] =[
   
    {name: 'All', count: 6},
    {name: 'homemade', count: 4},
    {name: 'made', count: 2},
    {name: 'fettuccia', count: 2},
    {name: 'cordino', count: 3},
    {name: 'littlebag', count: 1},
]