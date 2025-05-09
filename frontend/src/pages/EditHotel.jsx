import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as clientApi from '../clientApi';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';

const EditHotel = () => {
	const { hotelId } = useParams();
	const { showToast } = useAppContext();

	const { data: hotel } = useQuery(
		'fetchMyHotelById',
		() => clientApi.fetchMyHotelById(hotelId || ''),
		{
			enabled: !!hotelId,
		}
	);

	const { mutate, isLoading } = useMutation(clientApi.updateMyHotelById, {
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

	return (
		<ManageHotelForm
			hotel={hotel}
			onSave={handleSave}
			isLoading={isLoading}
		/>
	);
};

export default EditHotel;
