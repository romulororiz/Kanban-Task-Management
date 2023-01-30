import BoardSvg from '@assets/dashboard/icon-board.svg';
import Add from '@assets/dashboard/icon-add-task-mobile.svg';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '@features/boards/boardSlice';
import '@styles/scss/boards/BoardListItem.scss';

const BoardListItem = ({
	board,
	isActive,
	text,
	onClick,
	setModalMode,
	setShowModal,
}) => {
	// initialize dispatch and navigate
	const dispatch = useDispatch();

	// handle remove board based on id
	const handleRemoveBoard = id => {
		// remove board from store
		dispatch(deleteBoard(id));
	};

	// handle onClickUpdate
	const handleOnClickUpdate = id => {
		setModalMode('updateBoard');
		setShowModal(true);
		onClick(id);
	};

	return (
		<div
			className={`kanban__board-item ${!board && 'kanban__board-item_create'} ${
				isActive && 'kanban__board-item-active no-hover'
			}`}
		>
			<div className='kanban__board-item_icon'>
				<img src={BoardSvg} alt='board icon' />
			</div>
			<div className='kanban__board-item-text_actions'>
				<span
					className={`kanban__board-item_text ${
						!board && 'kanban__board-item_text_create'
					}`}
				>
					{!board && <img src={Add} alt='add board' />}
					<span onClick={board ? () => onClick(board._id) : null}>
						{!board ? text : board.name}
					</span>
				</span>
				{board && isActive && (
					<div className='kanban__board-item_actions'>
						<span className='kanban__board-item_actions_edit'>
							<FaRegEdit onClick={() => handleOnClickUpdate(board._id)} />
						</span>
						<span className='kanban__board-item_actions_delete'>
							<FaRegTrashAlt onClick={() => handleRemoveBoard(board._id)} />
						</span>
					</div>
				)}
			</div>
		</div>
	);
};
export default BoardListItem;
