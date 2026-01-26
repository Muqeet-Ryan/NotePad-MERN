import express from 'express';
import notesRoute from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

connectDB();

app.use('/api/notes', notesRoute);

const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

