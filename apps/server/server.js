import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/user.auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();
const app = express();
connectToDB();

app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
    res.json({
        "status": 200,
        "message": "Backend is up and running"
    });
})

app.listen(5000, () => {
    console.log("The server started and running at the port 5000");
})