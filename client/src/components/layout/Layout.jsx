import { useEffect, useState } from 'react';
import useAuthStatus from '@hooks/useAuthStatus';
import useWindowSize from '@hooks/useWindowSize';
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import { Outlet } from 'react-router-dom';
import ShowSidebar from './ShowSidebar';
import AddBoard from '@components/modal/content/addBoard/AddBoard';
import Modal from '@components/modal/Modal';
import '@styles/scss/layout/Layout.scss';

const Layout = () => {
	const [showSidebar, setShowSidebar] = useState(true);
	const [showModal, setShowModal] = useState(false);

	// get user
	const { user } = useAuthStatus();

	// handle window size
	const windowSize = useWindowSize();

	useEffect(() => {
		if (windowSize.width < 550) {
			setShowSidebar(false);
		}
	}, [windowSize]);

	return (
		<>
			<div>
				<Sidebar
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
				<Header user={user} showSidebar={showSidebar} />
				<main
					className={`kanban__main-content ${
						showSidebar && 'kanban__main-content_sidebar'
					}`}
				>
					<Outlet />
				</main>
				<ShowSidebar
					setShowSidebar={setShowSidebar}
					showSidebar={showSidebar}
				/>
			</div>
		</>
	);
};
export default Layout;
