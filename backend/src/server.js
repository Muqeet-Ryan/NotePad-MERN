import express from 'express';
import notesRoute from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/ratelimiter.js';
dotenv.config();

const app = express();

connectDB();
app.use(express.json());

app.use(rateLimiter);
app.use('/api/notes', notesRoute);

const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

