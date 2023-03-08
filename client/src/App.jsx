import { useState } from 'react';
import { useThemeContext } from '@hooks/useThemeContext';
import { ModalTitle } from '@utils/ModalTitle';
import { useSelector } from 'react-redux';
import { PrivateRoute } from '@components/PrivateRoute';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import useAuthStatus from '@hooks/useAuthStatus';
import Auth from '@pages/Auth';
import Layout from '@components/layout/Layout';
import Dashboard from '@pages/Dashboard';
import Modal from '@components/modal/Modal';
import ModalContent from '@utils/ModalContent';

function App() {
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState('');

	// get user from store
	const { user } = useAuthStatus();

	// get board from store
	const { board } = useSelector(state => state.board);

	// get theme from context
	const {
		state: { theme },
	} = useThemeContext();

	const commonProps = {
		theme,
		showModal,
		setShowModal,
		modalMode,
		setModalMode,
	};

	return (
		<div className={`${theme}`}>
			<Router>
				<Routes>
					<Route element={<Layout {...commonProps} />}>
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
								element={<Dashboard {...commonProps} />}
							/>
						</Route>
						<Route path='/dashboard/boards/:id' element={<PrivateRoute />}>
							<Route
								path='/dashboard/boards/:id'
								element={<Dashboard {...commonProps} />}
							/>
						</Route>
						<Route
							path='/dashboard/boards/:id/column/:columnId/task/:taskId'
							element={<PrivateRoute />}
						>
							<Route
								path='/dashboard/boards/:id/column/:columnId/task/:taskId'
								element={<Dashboard {...commonProps} />}
							/>
						</Route>
						<Route
							path='/dashboard/boards/:id/column/:columnId'
							element={<PrivateRoute />}
						>
							<Route
								path='/dashboard/boards/:id/column/:columnId'
								element={<Dashboard {...commonProps} />}
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

				{showModal && (
					<Modal
						setShowModal={setShowModal}
						modalMode={modalMode}
						theme={theme}
						title={ModalTitle(modalMode)}
						content={ModalContent(modalMode, setShowModal, setModalMode, board)}
					/>
				)}
			</Router>
		</div>
	);
}

export default App;
