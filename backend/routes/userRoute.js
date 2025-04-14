import express from 'express';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/userModel.js';

const router = express.Router();

router.post(
	'/register',
	[
		check('firstName', 'First Name is required').isString(),
		check('lastName', 'Last Name is required').isString(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({ message: 'User already exists' });
			}
			user = new User(req.body);
			await user.save();

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: '1d' }
			);

			res.cookie('auth_token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 86400000,
			});

			return res
				.status(200)
				.send({ message: 'User registered successfully' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Server Error' });
		}
	}
);

export default router;
