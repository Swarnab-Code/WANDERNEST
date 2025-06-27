import { useQuery } from 'react-query';
import * as clientApi from '../clientApi';
import LatestDestinationCard from '../components/LastestDestinationCard';

const Home = () => {
	const { data: hotels } = useQuery('fetchQuery', () =>
		clientApi.fetchHotels()
	);

	const topRowHotels = hotels?.slice(0, 2) || [];
	const bottomRowHotels = hotels?.slice(2) || [];

	return (
		<div className='space-y-3'>
			<h2 className='text-3xl font-bold'>Latest Destinations</h2>
			<p>Most recent destinations added by our hosts</p>
			<div className='grid gap-4'>
				<div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
					{topRowHotels.map((hotel, index) => (
						<LatestDestinationCard key={index} hotel={hotel} />
					))}
				</div>
				<div className='grid md:grid-cols-3 gap-4'>
					{bottomRowHotels.map((hotel, index) => (
						<LatestDestinationCard key={index + 2} hotel={hotel} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
