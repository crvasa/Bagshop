import { model, Schema, Types } from 'mongoose';
import { Bag } from './bag.model';
import { BagSchema } from './bag.model';
import { OrderStatus } from '../constants/order_status';

export interface LatLng {
  lat: string;
  lng: string;
}

export const LatLngSchema = new Schema<LatLng>({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

export interface OrderItem {
  bag: Bag;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  bag: { type: BagSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

export interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  addressLatLng: LatLng;
  paymentId: string;
  status: OrderStatus;
  user: Types.ObjectId;
  updateAt: Date;
  createdAt: Date;
}

const orderSchema = new Schema<Order>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  addressLatLng: { type: LatLngSchema, required: true },
  paymentId: { type: String },
  totalPrice: { type: Number, required: true },
  items: { type: [OrderItemSchema], required: true },
  status: { type: String, default: OrderStatus.NEW },
  user: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const OrderModel = model('order', orderSchema);
