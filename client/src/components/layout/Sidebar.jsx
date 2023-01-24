import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '@features/boards/boardSlice';
import BoardListItem from '@components/board/BoardListItem';
import HideSidebar from '@assets/dashboard/icon-hide-sidebar.svg';
import LogoDark from '@assets/dashboard/logo-dark.svg';
import ToggleSwitch from './ToggleSwitch';
import '@styles/scss/layout/Sidebar.scss';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
	const [errors, setErrors] = useState([]);
	const [activeBoard, setActiveBoard] = useState(null);

	// initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	// handle active board
	const handleActiveBoard = boardId => {
		setActiveBoard(boardId);
	};

	return (
		<div
			className={`kanban__sidebar ${
				showSidebar ? 'kanban__sidebar-show' : 'kanban__sidebar-hide'
			}`}
		>
			<div className='kanban__sidebar-boards_container'>
				<div className='kanban__sidebar-logo'>
					<img src={LogoDark} alt='logo dark' />
				</div>
				<h1>All Boards ({boards.length})</h1>
				{isLoading ? (
					// TODO ADD SPINNER
					'Loading...'
				) : (
					<div className='kanban__sidebar-boards'>
						{boards.map(board => (
							<BoardListItem
								key={board._id}
								board={board}
								isActive={board._id === activeBoard}
								onClick={boardId => {
									handleActiveBoard(boardId);
									navigate(`/dashboard/boards/${boardId}`);
								}}
							/>
						))}
					</div>
				)}
				<div className='kanban__sidebar-create_board'>
					<BoardListItem text='Create New Board' />
				</div>
			</div>
			<div className='kanban__sidebar-bottom_container'>
				<div className='kanban__sidebar-toggle'>
					<ToggleSwitch />
				</div>
				<div className='kanban__sidebar-hide-container'>
					<img src={HideSidebar} alt='hide sidebar' />
					<p onClick={() => setShowSidebar(false)}>Hide Sidebar</p>
				</div>
			</div>
		</div>
	);
};
export default Sidebar;
