import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { PrivateRoute } from '@components/PrivateRoute';
import useAuthStatus from '@hooks/useAuthStatus';
import Auth from '@pages/Auth';
import BoardList from '@components/board/BoardList';

function App() {
	// check if user is logged in
	const { user } = useAuthStatus();

	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<PrivateRoute />}>
						<Route exact path='/' element={<Navigate to='/boards' />} />
					</Route>
					<Route path='/boards' element={<PrivateRoute />}>
						<Route path='/boards' element={<BoardList />} />
					</Route>
					<Route
						path='/auth/login'
						element={user ? <Navigate to='/boards' /> : <Auth />}
					/>
					<Route
						path='/auth/register'
						element={user ? <Navigate to='/boards' /> : <Auth />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
