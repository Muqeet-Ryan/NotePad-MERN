import express from 'express';
import notesRoute from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/ratelimiter.js';
import cors from 'cors';
import path from 'path';


dotenv.config();

const app = express();

const __dirname = path.resolve();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://notepad-mern-frontend.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// app.use(rateLimiter);
app.use('/api/notes', notesRoute);

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    db: "connected",
    time: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

