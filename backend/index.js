import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
	console.log(`server running on localhost:${PORT}`);
});
