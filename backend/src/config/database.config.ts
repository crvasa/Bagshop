import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('✅ Connesso correttamente a MongoDB Atlas!'))
    .catch((error) => {
      console.error('❌ Errore di connessione a MongoDB:', error.message);
  
  
    });
};
