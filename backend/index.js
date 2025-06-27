import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import myHotelsRoutes from './routes/myHotels.js';
import hotelRoutes from './routes/hotels.js';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
app.use('/api/my-hotels', myHotelsRoutes);
app.use('/api/hotels', hotelRoutes);

app.listen(PORT, () => {
	console.log(`server running on localhost:${PORT}`);
});
