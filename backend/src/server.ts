import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import bagRouter from './routers/bag.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './config/database.config';

dbConnect();

const app = express();
const port = process.env.PORT || 5000;

// Abilita JSON e CORS
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}));


// ROUTES API
app.use("/api/bags", bagRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// ✅ SERVE ANGULAR FRONTEND (dopo aver fatto `ng build`)
app.use(express.static(path.join(__dirname, '../../dist/bagpage/browser')));

// ✅ ROUTING ANGULAR SPA (catch-all: tutte le rotte non-API vanno a index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/bagpage/browser/index.html'));
});

// ✅ AVVIO SERVER
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
