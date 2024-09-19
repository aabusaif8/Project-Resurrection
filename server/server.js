import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './controllers/authController.js';
import mangaRoutes from './routes/mangaRoutes.js';
import imageRoutes from './routes/imageRoutes.js'; // Import the image routes
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import commentsRoutes from './routes/commentsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));
app.use(cookieParser());

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the uploads directory

app.use('/', authRoutes);
app.use('/manga', mangaRoutes);
app.use('/search', searchRoutes);
app.use('/images', imageRoutes); // Add the image routes
app.use('/comments', commentsRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(8081, () => {
    console.log("running on port 8081");
});