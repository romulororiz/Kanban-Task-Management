import { useState, useEffect } from 'react';
import { createBoard } from '@features/boards/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardById, updateBoard } from '@features/boards/boardSlice';
import '@styles/scss/modal/addBoard/AddBoard.scss';

const AddBoard = ({ setShowModal, modalMode, setModalMode, board }) => {
	const [boardName, setBoardName] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);

	// get board from store
	const { isLoading } = useSelector(state => state.board);

	// initialize dispatch
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// check modal mode
	useEffect(() => {
		if (modalMode === 'updateBoard') {
			setIsUpdate(true);
			// set board name to current board name
			setBoardName(board.name);
		}
	}, [modalMode, dispatch, board.name]);

	useEffect(() => {
		// get board data
		dispatch(getBoardById(board._id));
	}, [board._id]);

	// Handle input changes
	const onChangeHandler = e => {
		setBoardName(e.target.value);
	};

	// Submit new board to database
	const onSubmitHandler = e => {
		e.preventDefault();

		const boardData = {
			name: boardName,
		};

		if (boardName === '') return;

		if (isUpdate) {
			dispatch(updateBoard({ boardId: board._id, boardData }));
		} else {
			// create board
			dispatch(createBoard(boardData)).then(res => {
				// Navigate to new board
				navigate(`/dashboard/boards/${res.payload._id}`);
			});
		}

		if (isUpdate) {
			setIsUpdate(false);
			setModalMode('addBoard');
		}

		// Close modal
		setShowModal(false);
	};

	return (
		<div className='kanban__add-board'>
			<form onSubmit={onSubmitHandler}>
				<div className='kanban__add-board_heading'>
					<label htmlFor='board-name'>Board Name</label>
					<input
						type='text'
						placeholder='e.g marketing plan'
						name='name'
						// todo - add loading state
						value={isUpdate && isLoading ? 'Loading...' : boardName}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='kanban__modal-footer'>
					<button type='submit' className='kanban__modal-button'>
						{isUpdate ? 'Update' : 'Create'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddBoard;
