import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order{
    _id!: string;
    items!:CartItem[];
    totalPrice!:number;
    name!: string;
    address!: string;
    addressLatLng?:LatLng;
    paymentId!: string;
    createdAt!: string;
    status!: string;
}