import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { PrivateRoute } from '@components/PrivateRoute';
import useAuthStatus from '@hooks/useAuthStatus';
import Auth from '@pages/Auth';
import Layout from '@components/layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
	// check if user is logged in
	const { user } = useAuthStatus();

	return (
		<>
			<Router>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<PrivateRoute />}>
							<Route exact path='/' element={<Navigate to='/dashboard' />} />
						</Route>
						<Route path='/dashboard' element={<PrivateRoute />}>
							<Route path='/dashboard' element={<Dashboard />} />
						</Route>
					</Route>
					<Route
						path='/auth/login'
						element={user ? <Navigate to='/dashboard' /> : <Auth />}
					/>
					<Route
						path='/auth/register'
						element={user ? <Navigate to='/dashboard' /> : <Auth />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
