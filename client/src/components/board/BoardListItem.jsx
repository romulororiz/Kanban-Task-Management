import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '@features/boards/boardSlice';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { TiPlus } from 'react-icons/ti';
import useConfirmAlert from '@hooks/useConfirmAlert';
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

	// use confirm alert
	const [setTitle, setMessage, setButtons] = useConfirmAlert();

	// handle remove board based on id
	const handleRemoveBoard = id => {
		// remove board from store
		// confirm alert
		setTitle('Delete this board?');
		setMessage(
			`Are you sure you want to delete the ‘${board.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
		);
		setButtons([
			{
				label: 'Delete',
				onClick: () => {
					dispatch(deleteBoard(id));
				},
			},
			{
				label: 'Cancel',
				onClick: () => {},
			},
		]);
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
				<TbLayoutBoardSplit />
			</div>
			<div className='kanban__board-item-text_actions'>
				<span
					className={`kanban__board-item_text ${
						!board && 'kanban__board-item_text_create'
					}`}
				>
					{!board && <TiPlus />}
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
