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
import Dashboard from '@pages/Dashboard';

function App() {
	const { user } = useAuthStatus();

	return (
		<>
			<Router>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<PrivateRoute />}>
							<Route
								exact
								path='/'
								element={<Navigate to='/dashboard/boards' />}
							/>
						</Route>
						<Route path='/dashboard/boards' element={<PrivateRoute />}>
							<Route path='/dashboard/boards' element={<Dashboard />} />
						</Route>
						<Route path='/dashboard/boards/:id' element={<PrivateRoute />}>
							<Route path='/dashboard/boards/:id' element={<Dashboard />} />
						</Route>
						<Route
							path='/dashboard/boards/:id/column/:columnId/task/:taskId'
							element={<PrivateRoute />}
						>
							<Route
								path='/dashboard/boards/:id/column/:columnId/task/:taskId'
								element={<Dashboard />}
							/>
						</Route>
						<Route
							path='/dashboard/boards/:id/column/:columnId'
							element={<PrivateRoute />}
						>
							<Route
								path='/dashboard/boards/:id/column/:columnId'
								element={<Dashboard />}
							/>
						</Route>
					</Route>
					<Route
						path='/auth/login'
						element={user ? <Navigate to='/dashboard/boards' /> : <Auth />}
					/>
					<Route
						path='/auth/register'
						element={user ? <Navigate to='/dashboard/boards' /> : <Auth />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
