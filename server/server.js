// server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './controllers/authController.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/', authRoutes);


app.listen(8081, () => {
    console.log("running on port 8081");
});