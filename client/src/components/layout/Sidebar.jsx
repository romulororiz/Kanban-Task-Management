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
	setShowModal,
	setModalMode,
	theme,
}) => {
	const [activeBoard, setActiveBoard] = useState(null);

	// initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// get id from params
	const { id: boardId } = useParams();

	// get boards from store
	const { boards } = useSelector(state => state.board);

	// get all boards
	useEffect(() => {
		dispatch(getBoards());
	}, []);

	useEffect(() => {
		const firstBoard = boards[0]?._id;
		const currBoard = boards.find(board => board._id === boardId);

		if (!currBoard) {
			//If there are boards in the store, set the active board to first one and navigate to it
			if (boards.length > 0) {
				setActiveBoard(firstBoard);
				navigate(`/dashboard/boards/${firstBoard}`);
			} else {
				//If there are no boards in the store, set active board to null
				setActiveBoard(null);
				navigate('/dashboard/boards');
			}
		}

		// navigate to newly created board
		if (boardId && currBoard) {
			setActiveBoard(boardId);
		}
	}, [boardId, boards]);

	// handle on click
	const handleOnClickBoard = boardId => {
		setActiveBoard(boardId);
		navigate(`/dashboard/boards/${boardId}`);
	};

	return (
		<div
			className={`${
				theme === 'dark' ? 'kanban__sidebar-dark' : 'kanban__sidebar'
			} ${showSidebar ? 'kanban__sidebar-show' : 'kanban__sidebar-hide'}`}
		>
			<div className='kanban__sidebar-boards_container'>
				<div className='kanban__sidebar-logo'>
					<img src={theme === 'dark' ? LogoLight : LogoDark} alt='logo dark' />
				</div>

				<h1>All Boards ({boards.length})</h1>
				<div className='kanban__sidebar-boards'>
					{boards.map(board => (
						<BoardListItem
							key={board._id}
							board={board}
							boards={boards}
							isActive={board._id === activeBoard}
							onClick={handleOnClickBoard}
							setModalMode={setModalMode}
							setShowModal={setShowModal}
						/>
					))}
				</div>
				<div
					className='kanban__sidebar-create_board'
					onClick={() => {
						setShowModal(true);
						setModalMode('addBoard');
					}}
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
	);
};
export default Sidebar;
