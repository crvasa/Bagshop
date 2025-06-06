import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import bagRouter from './routers/bag.router'
import userRouter  from './routers/user.router';
import { dbConnect } from './config/database.config';
import orderRouter  from './routers/order.router';
dbConnect();

const app= express ();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}));

app.use("/api/bags", bagRouter);

app.use("/api/users",userRouter);

app.use("/api/orders",orderRouter);
const port = 5000;
app.listen(port, () => {
    console.log("website served on http://localhost:" +port);
})

