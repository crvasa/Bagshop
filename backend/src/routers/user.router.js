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
const user_model_1 = require("../models/user.model");
const http_status_1 = require("../constants/http_status");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
// 🔐 LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.UserModel.findOne({ email: email.toLowerCase() });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        res.send(generateTokenResponse(user));
    }
    else {
        res.status(http_status_1.HTTP_BAD_REQUEST).send('Username o password non validi!');
    }
}));
// 👤 REGISTRAZIONE
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address } = req.body;
    const userExists = yield user_model_1.UserModel.findOne({ email: email.toLowerCase() });
    if (userExists) {
        res.status(http_status_1.HTTP_BAD_REQUEST).send('Utente già esistente. Effettua il login.');
        return;
    }
    const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = {
        id: '',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false,
    };
    const dbUser = yield user_model_1.UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
}));
// 🎟️ Funzione per generare il token
const generateTokenResponse = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '30d' });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token,
    };
};
exports.default = router;
