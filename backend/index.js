import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
	.connect(MONGODB_URI)
	.then(() => console.log('MongoDB connected successfully'))
	.catch((error) => {
		console.error('MongoDB connection error:', error);
	});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
	console.log(`server running on localhost:${PORT}`);
});
