import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as clientApi from '../clientApi';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

const AppContext = React.createContext(undefined);

const stripePromise = STRIPE_PUB_KEY ? loadStripe(STRIPE_PUB_KEY) : null;

export const AppContextProvider = ({ children }) => {
	const [toast, setToast] = useState(undefined);

	const { isError } = useQuery('validateToken', clientApi.validateToken, {
		retry: false,
	});

	return (
		<AppContext.Provider
			value={{
				showToast: (toastMessage) => {
					setToast(toastMessage);
				},
				isLoggedIn: !isError,
				stripePromise,
			}}
		>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(undefined)}
				/>
			)}
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context;
};
