import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asynceHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
const router= Router();

router.get("/seed", asynceHandler(
    async(req: Request, res: Response) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount>0){
            res.send("Seed is already done !");
            return ;
        }
        await UserModel.create(sample_users);
        res.send("Seed is done!")
    }
))

router.post("/login",asynceHandler(
    async(req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email,password});
    
        if(user){
            res.send(generateTokenResponse(user));
        }else{
            res.status(HTTP_BAD_REQUEST).send("Username or password in not valid !");
        }
}
))

const generateTokenResponse = (user: any) => {
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      "SomeRandomText",
      { expiresIn: "30d" }
    );
  
    router.post('/register', asynceHandler(
        async(req: Request, res: Response) => {
            const{ name, email, password, address} = req.body;
            const user= await UserModel.findOne({email});
            if(user){
                res.status(HTTP_BAD_REQUEST).send('User already exist, please login!');
                return;
            }
            const encyptedPassword = await bcrypt.hash(password, 10);
            const newUser:User ={
                id:'',
                name,
                email: email.toLowerCase(),
                password: encyptedPassword,
                address,
                isAdmin: false
            } 
            const dbUser = await UserModel.create(newUser);
            res.send(generateTokenResponse(dbUser));
        }
    ))
    // 🔥 Torna un oggetto PULITO, non un documento Mongoose
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  };
  

export default router;