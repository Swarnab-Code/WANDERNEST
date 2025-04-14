import { useMutation, useQueryClient } from 'react-query';
import * as clientApi from '../clientApi';
import { useAppContext } from '../contexts/AppContext';

const LogOutButton = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const mutation = useMutation(clientApi.logOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries('validateToken');
			showToast({ message: 'Logged Out!', type: 'SUCCESS' });
		},
		onError: (error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button
			onClick={handleClick}
			className='text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 cursor-pointer'
		>
			Logout
		</button>
	);
};

export default LogOutButton;
