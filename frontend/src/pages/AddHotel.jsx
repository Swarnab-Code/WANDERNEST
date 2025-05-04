import { useMutation } from 'react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';
import * as clientApi from '../clientApi';

const AddHotel = () => {
	const { showToast } = useAppContext();

	const { mutate, isLoading } = useMutation(clientApi.addMyHotel, {
		onSuccess: () => {
			showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error Saving Hotel', type: 'ERROR' });
		},
	});

	const handleSave = (hotelFormData) => {
		mutate(hotelFormData);
	};

	return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
