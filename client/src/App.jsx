import { useEffect, useState } from 'react';
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
import Modal from '@components/modal/Modal';
import ModalContent from '@utils/ModalContent';
import { ModalTitle } from '@utils/ModalTitle';
import { useSelector } from 'react-redux';

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

	// change body background color based on theme
	useEffect(() => {
		document.body.style.backgroundColor =
			theme === 'light' ? '#f4f7fd' : '#20212c';
	}, [theme]);

	return (
		<Router>
			<Routes>
				<Route
					element={
						<Layout
							theme={theme}
							showModal={showModal}
							setShowModal={setShowModal}
							modalMode={modalMode}
							setModalMode={setModalMode}
						/>
					}
				>
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
							element={
								<Dashboard
									theme={theme}
									showModal={showModal}
									setShowModal={setShowModal}
									modalMode={modalMode}
									setModalMode={setModalMode}
								/>
							}
						/>
					</Route>
					<Route path='/dashboard/boards/:id' element={<PrivateRoute />}>
						<Route
							path='/dashboard/boards/:id'
							element={
								<Dashboard
									theme={theme}
									showModal={showModal}
									setShowModal={setShowModal}
									modalMode={modalMode}
									setModalMode={setModalMode}
								/>
							}
						/>
					</Route>
					<Route
						path='/dashboard/boards/:id/column/:columnId/task/:taskId'
						element={<PrivateRoute />}
					>
						<Route
							path='/dashboard/boards/:id/column/:columnId/task/:taskId'
							element={
								<Dashboard
									theme={theme}
									showModal={showModal}
									setShowModal={setShowModal}
									modalMode={modalMode}
									setModalMode={setModalMode}
								/>
							}
						/>
					</Route>
					<Route
						path='/dashboard/boards/:id/column/:columnId'
						element={<PrivateRoute />}
					>
						<Route
							path='/dashboard/boards/:id/column/:columnId'
							element={
								<Dashboard
									theme={theme}
									showModal={showModal}
									setShowModal={setShowModal}
									modalMode={modalMode}
									setModalMode={setModalMode}
								/>
							}
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
					content={ModalContent(
						modalMode,
						setShowModal,
						setModalMode,
						board,
						theme
					)}
				/>
			)}
		</Router>
	);
}

export default App;
