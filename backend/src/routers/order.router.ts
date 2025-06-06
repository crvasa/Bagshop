import { Router } from "express";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import asyncHandler from 'express-async-handler';
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import { auth } from '../middlewares/auth.mid';

const router = Router();

// ✅ Crea un nuovo ordine
router.post('/', auth, asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body;

  if (!requestOrder.items || requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send('Cart is Empty!');
    return;
  }

  await OrderModel.deleteOne({
    user: req.user.id,
    status: OrderStatus.NEW
  });

  const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
  await newOrder.save();

  console.log('✅ ORDINE RICEVUTO:', newOrder);
  res.json(newOrder);
}));

// ✅ Recupera l'ordine NEW dell'utente corrente
router.get('/newOrderForCurrentUser', auth, asyncHandler(async (req: any, res: any) => {
  const order = await getNewOrderForCurrentUser(req);
  if (order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send('Nessun ordine trovato');
}));

// ✅ Pagamento ordine
router.post('/pay', auth, asyncHandler(async (req: any, res: any) => {
  const { paymentId } = req.body;
  const order = await getNewOrderForCurrentUser(req);

  if (!order) {
    res.status(HTTP_BAD_REQUEST).send('Ordine non trovato');
    return;
  }

  order.paymentId = paymentId;
  order.status = OrderStatus.PAYED;
  await order.save();

  res.send(order._id);
}));

// ✅ Lista ordini dell’utente corrente
router.get('/my', auth, asyncHandler(async (req: any, res: any) => {
  const orders = await OrderModel.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.send(orders);
}));

// ✅ Recupera un ordine specifico
router.get('/track/:id', asyncHandler(async (req: any, res: any) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    res.status(HTTP_BAD_REQUEST).send('Ordine non trovato');
    return;
  }
  res.send(order);
}));

export default router;

// ✅ Funzione helper
async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
