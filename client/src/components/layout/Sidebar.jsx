import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '@features/boards/boardSlice';
import BoardItem from '@components/board/BoardItem';
import HideSidebar from '@assets/dashboard/icon-hide-sidebar.svg';
import BoardSvg from '@assets/dashboard/icon-board.svg';
import '@styles/scss/layout/Sidebar.scss';

const Sidebar = ({ showSidebar }) => {
	const [errors, setErrors] = useState([]);
	const [activeBoard, setActiveBoard] = useState(null);

	// initialize dispatch
	const dispatch = useDispatch();

	const {
		boards,
		isError,
		errors: boardErrors,
		isLoading,
	} = useSelector(state => state.board);

	useEffect(() => {
		if (isError) {
			setErrors(boardErrors);
		}

		dispatch(getBoards());
	}, []);

	// handle loading

	return (
		<div className='kanban__sidebar'>
			<div className='kanban__sidebar-boards_container'>
				<h1>All Boards ({boards.length})</h1>
				{isLoading ? (
					// TODO ADD SPINNER
					'Loading...'
				) : (
					<div className='kanban__sidebar-boards'>
						{boards.map(board => (
							<BoardItem key={board._id} board={board} />
						))}
					</div>
				)}
				<div className='kanban__sidebar-create_board'>
					<BoardItem text='Create New Board' />
				</div>
			</div>
			<div className='kanban__sidebar-bottom_container'>
				<div className='kanban__sidebar-toggle'>
					<p>icon</p>
					<p>toogle</p>
					<p>icon</p>
				</div>
				<div className='kanban__sidebar-hide'>
					<img src={HideSidebar} alt='hide sidebar' />
					<p>Hide Sidebar</p>
				</div>
			</div>
		</div>
	);
};
export default Sidebar;
