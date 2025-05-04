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
							<p>Search Page</p>
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

				{isLoggedIn && (
					<>
						<Route
							path='/add-hotel'
							element={
								<Layout>
									{' '}
									<AddHotel />{' '}
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
