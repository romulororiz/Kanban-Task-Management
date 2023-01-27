import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoards } from '@features/boards/boardSlice';
import useOnClickOutside from '@hooks/useOnClickOutside';
import BoardListItem from '@components/board/BoardListItem';
import HideSidebar from '@assets/dashboard/icon-hide-sidebar.svg';
import LogoDark from '@assets/dashboard/logo-dark.svg';
import ToggleSwitch from './ToggleSwitch';
import Modal from '../modal/Modal';
import AddBoard from '../modal/content/addBoard/AddBoard';
import '@styles/scss/layout/Sidebar.scss';

const Sidebar = ({ showSidebar, setShowSidebar, showModal, setShowModal }) => {
	const [activeBoard, setActiveBoard] = useState(null);
	// todo - get last active board from local storage

	// initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// get id from params
	const { id: boardId } = useParams();

	const { boards } = useSelector(state => state.board);

	// check for active board
	useEffect(() => {
		if (boardId) {
			setActiveBoard(boardId);
		} else {
			if (boards.length > 0) {
				setActiveBoard(boards[0]._id);
				navigate(`/dashboard/boards/${boards[0]._id}`);
			}
		}
	}, [boardId, boards]);

	// get all boards
	useEffect(() => {
		dispatch(getBoards());
	}, [boardId]);

	// handle on click
	const handleOnClick = boardId => {
		setActiveBoard(boardId);
		navigate(`/dashboard/boards/${boardId}`);
	};

	return (
		<>
			{showModal && (
				<Modal
					setShowModal={setShowModal}
					title='Add New Board'
					content={<AddBoard setShowModal={setShowModal} />}
				/>
			)}
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
					<div className='kanban__sidebar-boards'>
						{boards.map(board => (
							<BoardListItem
								key={board._id}
								board={board}
								isActive={board._id === activeBoard}
								onClick={handleOnClick}
							/>
						))}
					</div>
					<div
						className='kanban__sidebar-create_board'
						onClick={() => setShowModal(true)}
					>
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
		</>
	);
};
export default Sidebar;
