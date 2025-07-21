export class Bag{
    id!: number;
    name!:string;
    price!:number;
    tags?:string[];
    favorite: boolean= false;
    description!: string;
    imageUrl!: string;
    origins!:string[];
    workTime!: string;
}