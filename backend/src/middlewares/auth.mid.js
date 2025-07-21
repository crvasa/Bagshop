"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const http_status_1 = require("../constants/http_status");
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(http_status_1.HTTP_UNAUTHORIZED).json({ message: 'Token mancante' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedUser = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || 'fallback-secret');
        req.user = decodedUser;
        next();
    }
    catch (error) {
        console.log('Token non valido ricevuto:', token);
        res.status(http_status_1.HTTP_UNAUTHORIZED).json({ message: 'Token non valido' });
    }
};
exports.auth = auth;
