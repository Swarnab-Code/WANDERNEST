const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export const register = async (formData) => {
	const response = await fetch(`${BACKEND_URL}/api/users/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}
};

export const validateToken = async () => {
	const response = await fetch(`${BACKEND_URL}/api/auth/validate-token`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Token invalid');
	}

	return response.json();
};

export const logIn = async (formData) => {
	const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	const body = await response.json();
	if (!response.ok) {
		throw new Error(body.message);
	}
	return body;
};

export const logOut = async () => {
	const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
		method: 'POST',
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Error during logout');
	}
};

export const addMyHotel = async (hotelFormData) => {
	const response = await fetch(`${BACKEND_URL}/api/my-hotels`, {
		method: 'POST',
		credentials: 'include',
		body: hotelFormData,
	});

	if (!response.ok) {
		throw new Error('Failed to add hotel');
	}

	return response.json();
};

export const fetchMyHotels = async () => {
	const response = await fetch(`${BACKEND_URL}/api/my-hotels`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Error fetching hotels');
	}

	return response.json();
};

export const fetchMyHotelById = async (hotelId) => {
	const response = await fetch(`${BACKEND_URL}/api/my-hotels/${hotelId}`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Error fetching Hotels');
	}

	return response.json();
};

export const updateMyHotelById = async (hotelFormData) => {
	const response = await fetch(
		`${BACKEND_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
		{
			method: 'PUT',
			body: hotelFormData,
			credentials: 'include',
		}
	);

	if (!response.ok) {
		throw new Error('Failed to update Hotel');
	}

	return response.json();
};
