import { useEffect, useState } from 'react';
import useAuthStatus from '@hooks/useAuthStatus';
import useWindowSize from '@hooks/useWindowSize';
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import { Outlet } from 'react-router-dom';
import '@styles/scss/layout/Layout.scss';
import ShowSidebar from './ShowSidebar';

const Layout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

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
		<div>
			<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
			<Header user={user} showSidebar={showSidebar} />
			<main
				className={`kanban__main-content ${
					showSidebar && 'kanban__main-content_sidebar'
				}`}
			>
				<Outlet />
				<ShowSidebar
					setShowSidebar={setShowSidebar}
					showSidebar={showSidebar}
				/>
			</main>
		</div>
	);
};
export default Layout;
