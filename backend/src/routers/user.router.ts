import { Router } from 'express';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// 🔐 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email.toLowerCase() });

  if (user && await bcrypt.compare(password, user.password)) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(HTTP_BAD_REQUEST).send('Username o password non validi!');
  }
});

// 👤 REGISTRAZIONE
router.post('/register', async (req, res) => {
  const { name, email, password, address } = req.body;

  const userExists = await UserModel.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(HTTP_BAD_REQUEST).send('Utente già esistente. Effettua il login.');
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: '',
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false,
  };

  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenResponse(dbUser));
});

// 🎟️ Funzione per generare il token
const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '30d' }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;
