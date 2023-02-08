import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoards } from '@features/boards/boardSlice';
import BoardListItem from '@components/board/BoardListItem';
import LogoDark from '@assets/dashboard/logo-dark.svg';
import LogoLight from '@assets/dashboard/logo-light.svg';
import ToggleSwitch from './ToggleSwitch';
import Modal from '@components/modal/Modal';
import AddBoard from '@components/modal/content/addBoard/AddBoard';
import { FaEyeSlash } from 'react-icons/fa';
import '@styles/scss/layout/Sidebar.scss';

const Sidebar = ({
	showSidebar,
	setShowSidebar,
	showModal,
	setShowModal,
	board,
	theme,
}) => {
	const [activeBoard, setActiveBoard] = useState(null);
	const [modalMode, setModalMode] = useState('addBoard');

	// initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// get id from params
	const { id: boardId } = useParams();

	// get boards from store
	const { boards, isLoading } = useSelector(state => state.board);

	useEffect(() => {
		const boardExists = boards.find(board => board._id === boardId);
		const prevBoard = boards[boards.length - 1];
		if (!boardExists) {
			// Case 1: If there are still boards in the store, set the active board to the previous one
			if (boards.length > 0) {
				setActiveBoard(prevBoard._id);
				navigate(`/dashboard/boards/${prevBoard._id}`);
			} // Case 2: If there are no prev boards and there are still boards in the store, set active board to current board
			else if (!prevBoard && boards.length > 0) {
				setActiveBoard(boardId);
			}
			// Case 3: if theres no prev board and no boards in the store, set active board to null and navigate to boards
			else if (!prevBoard && boards.length === 0) {
				setActiveBoard(null);
				navigate(`/dashboard/boards`);
			}
			// Case 4: if there is no board id in the params, set active board to null
		} else if (!boardId) {
			setActiveBoard(null);
		} else {
			setActiveBoard(boardId);
		}
	}, [boardId, boards]);

	// get all boards
	useEffect(() => {
		dispatch(getBoards());
	}, []);

	// handle on click
	const handleOnClickBoard = boardId => {
		setActiveBoard(boardId);
		navigate(`/dashboard/boards/${boardId}`);
	};

	return (
		<>
			{showModal && (
				<Modal
					setShowModal={setShowModal}
					title={modalMode === 'addBoard' ? 'Create New Board' : 'Edit Board'}
					setModalMode={setModalMode}
					modalMode={modalMode}
					content={
						<AddBoard
							setShowModal={setShowModal}
							modalMode={modalMode}
							setModalMode={setModalMode}
							board={board}
						/>
					}
				/>
			)}
			<div
				className={`${
					theme === 'dark' ? 'kanban__sidebar-dark' : 'kanban__sidebar'
				} ${showSidebar ? 'kanban__sidebar-show' : 'kanban__sidebar-hide'}`}
			>
				<div className='kanban__sidebar-boards_container'>
					<div className='kanban__sidebar-logo'>
						<img
							src={theme === 'dark' ? LogoLight : LogoDark}
							alt='logo dark'
						/>
					</div>

					<h1>All Boards ({boards.length})</h1>
					<div className='kanban__sidebar-boards'>
						{boards.map(board => (
							<BoardListItem
								key={board._id}
								board={board}
								isActive={board._id === activeBoard}
								onClick={handleOnClickBoard}
								setModalMode={setModalMode}
								setShowModal={setShowModal}
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
						<FaEyeSlash />
						<p onClick={() => setShowSidebar(false)}>Hide Sidebar</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default Sidebar;
