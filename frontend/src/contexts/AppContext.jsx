import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as clientApi from '../clientApi';

const AppContext = React.createContext(undefined);

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
