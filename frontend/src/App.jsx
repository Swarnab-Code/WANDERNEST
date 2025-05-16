import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import { useAppContext } from './contexts/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import HotelDetail from './pages/HotelDetail';
import Booking from './pages/Booking';

const App = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<Layout>
							<p>Home Page</p>
						</Layout>
					}
				/>
				<Route
					path='/search'
					element={
						<Layout>
							<Search />
						</Layout>
					}
				/>
				<Route
					path='/register'
					element={
						<Layout>
							<Register />
						</Layout>
					}
				/>
				<Route
					path='/login'
					element={
						<Layout>
							<LogIn />
						</Layout>
					}
				/>
				<Route
					path='/detail/:hotelId'
					element={
						<Layout>
							<HotelDetail />
						</Layout>
					}
				/>

				{isLoggedIn && (
					<>
						<Route
							path='/add-hotel'
							element={
								<Layout>
									<AddHotel />
								</Layout>
							}
						/>
						<Route
							path='/my-hotels'
							element={
								<Layout>
									<MyHotels />
								</Layout>
							}
						/>
						<Route
							path='/edit-hotel/:hotelId'
							element={
								<Layout>
									<EditHotel />
								</Layout>
							}
						/>
						<Route
							path='/hotel/:hotelId/booking'
							element={
								<Layout>
									<Booking />
								</Layout>
							}
						/>
					</>
				)}

				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Router>
	);
};

export default App;
