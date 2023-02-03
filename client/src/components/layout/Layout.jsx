import { useEffect, useState } from 'react';
import useAuthStatus from '@hooks/useAuthStatus';
import useWindowSize from '@hooks/useWindowSize';
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import { Outlet, useParams } from 'react-router-dom';
import ShowSidebar from './ShowSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardById } from '@features/boards/boardSlice';
import { getBoardColumns } from '@features/columns/columnSlice';
import '@styles/scss/layout/Layout.scss';

const Layout = () => {
	const [showSidebar, setShowSidebar] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const { board, boards } = useSelector(state => state.board);
	const { columns } = useSelector(state => state.column);

	const dispatch = useDispatch();

	// get board id from params
	const { id: boardId } = useParams();

	// get user
	const { user } = useAuthStatus();

	// handle window size
	const windowSize = useWindowSize();

	useEffect(() => {
		if (windowSize.width < 550) {
			setShowSidebar(false);
		}
	}, [windowSize]);

	// get board and columns
	useEffect(() => {
		dispatch(getBoardById(boardId));
		dispatch(getBoardColumns(boardId));
	}, [boardId, dispatch]);

	return (
		<div>
			<Sidebar
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
				showModal={showModal}
				setShowModal={setShowModal}
				board={board}
			/>
			<Header
				user={user}
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
				board={board}
				boards={boards}
				columns={columns}
			/>
			<main
				className={`kanban__main-content ${
					showSidebar && 'kanban__main-content_sidebar'
				}`}
			>
				<Outlet />
			</main>
			<ShowSidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
		</div>
	);
};
export default Layout;
