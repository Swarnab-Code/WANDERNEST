import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel.js';
import verifyToken from '../middlewares/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

async function uploadImages(imageFiles) {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString('base64');
		const dataURI = `data:${image.mimetype};base64,${b64}`;
		const res = await cloudinary.v2.uploader.upload(dataURI);
		return res.url;
	});

	const imageUrls = await Promise.all(uploadPromises);
	return imageUrls;
}

router.post(
	'/',
	verifyToken,
	[
		body('name').notEmpty().withMessage('Name is required'),
		body('city').notEmpty().withMessage('City is required'),
		body('country').notEmpty().withMessage('Country is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('type').notEmpty().withMessage('Hotel type is required'),
		body('pricePerNight')
			.notEmpty()
			.isNumeric()
			.withMessage('Price per night is required and must be a number'),
		body('facilities')
			.notEmpty()
			.isArray()
			.withMessage('Facilities are required'),
	],
	upload.array('imageFiles', 6),
	async (req, res) => {
		try {
			const imageFiles = req.files;
			const newHotel = req.body;

			const imageUrls = await uploadImages(imageFiles);

			newHotel.imageUrls = imageUrls;
			newHotel.lastUpdated = new Date();
			newHotel.userId = req.userId;

			const hotel = new Hotel(newHotel);
			await hotel.save();

			res.status(201).send(hotel);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Something went wrong' });
		}
	}
);

export default router;
