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
import { useThemeContext } from '@hooks/useThemeContext';
import { useEffect } from 'react';

function App() {
	// get user from store
	const { user } = useAuthStatus();

	// get theme from context
	const {
		state: { theme },
	} = useThemeContext();

	// change body background color based on theme
	useEffect(() => {
		document.body.style.backgroundColor =
			theme === 'light' ? '#f4f7fd' : '#20212c';
	}, [theme]);

	return (
		<>
			<Router>
				<Routes>
					<Route element={<Layout theme={theme} />}>
						<Route path='/' element={<PrivateRoute />}>
							<Route
								exact
								path='/'
								element={<Navigate to='/dashboard/boards' />}
							/>
						</Route>
						<Route path='/dashboard/boards' element={<PrivateRoute />}>
							<Route
								path='/dashboard/boards'
								element={<Dashboard theme={theme} />}
							/>
						</Route>
						<Route path='/dashboard/boards/:id' element={<PrivateRoute />}>
							<Route
								path='/dashboard/boards/:id'
								element={<Dashboard theme={theme} />}
							/>
						</Route>
						<Route
							path='/dashboard/boards/:id/column/:columnId/task/:taskId'
							element={<PrivateRoute />}
						>
							<Route
								path='/dashboard/boards/:id/column/:columnId/task/:taskId'
								element={<Dashboard theme={theme} />}
							/>
						</Route>
						<Route
							path='/dashboard/boards/:id/column/:columnId'
							element={<PrivateRoute />}
						>
							<Route
								path='/dashboard/boards/:id/column/:columnId'
								element={<Dashboard theme={theme} />}
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
