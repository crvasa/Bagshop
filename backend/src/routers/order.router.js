"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = require("../constants/http_status");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const order_model_1 = require("../models/order.model");
const order_status_1 = require("../constants/order_status");
const auth_mid_1 = require("../middlewares/auth.mid");
const router = (0, express_1.Router)();
// ✅ Crea un nuovo ordine
router.post('/', auth_mid_1.auth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOrder = req.body;
    if (!requestOrder.items || requestOrder.items.length <= 0) {
        res.status(http_status_1.HTTP_BAD_REQUEST).send('Cart is Empty!');
        return;
    }
    yield order_model_1.OrderModel.deleteOne({
        user: req.user.id,
        status: order_status_1.OrderStatus.NEW
    });
    const newOrder = new order_model_1.OrderModel(Object.assign(Object.assign({}, requestOrder), { user: req.user.id }));
    yield newOrder.save();
    console.log('✅ ORDINE RICEVUTO:', newOrder);
    res.json(newOrder);
})));
// ✅ Recupera l'ordine NEW dell'utente corrente
router.get('/newOrderForCurrentUser', auth_mid_1.auth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield getNewOrderForCurrentUser(req);
    if (order)
        res.send(order);
    else
        res.status(http_status_1.HTTP_BAD_REQUEST).send('Nessun ordine trovato');
})));
// ✅ Pagamento ordine
router.post('/pay', auth_mid_1.auth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId } = req.body;
    const order = yield getNewOrderForCurrentUser(req);
    if (!order) {
        res.status(http_status_1.HTTP_BAD_REQUEST).send('Ordine non trovato');
        return;
    }
    order.paymentId = paymentId;
    order.status = order_status_1.OrderStatus.PAYED;
    yield order.save();
    res.send(order._id);
})));
// ✅ Lista ordini dell’utente corrente
router.get('/my', auth_mid_1.auth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.send(orders);
})));
// ✅ Recupera un ordine specifico
router.get('/track/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findById(req.params.id);
    if (!order) {
        res.status(http_status_1.HTTP_BAD_REQUEST).send('Ordine non trovato');
        return;
    }
    res.send(order);
})));
exports.default = router;
// ✅ Funzione helper
function getNewOrderForCurrentUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield order_model_1.OrderModel.findOne({ user: req.user.id, status: order_status_1.OrderStatus.NEW });
    });
}
