import { useState, useEffect } from 'react';
import { createBoard } from '@features/boards/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBoard } from '@features/boards/boardSlice';
import Error from '@components/Error';
import '@styles/scss/modal/addBoard/AddBoard.scss';

const AddBoard = ({ setShowModal, modalMode, setModalMode, board }) => {
	const [boardName, setBoardName] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);
	const [errors, setErrors] = useState([]);

	// initialize dispatch
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// check modal mode
	useEffect(() => {
		if (modalMode === 'updateBoard') {
			setIsUpdate(true);
			setBoardName(board.name);
		}
	}, [modalMode, board]);

	// clear errors on empty input
	useEffect(() => {
		if (errors.length) {
			setTimeout(() => {
				setErrors([]);
			}, 3000);
		}
	}, [errors]);

	// Submit new board to database
	const onSubmitHandler = e => {
		e.preventDefault();

		if (!boardName) {
			setErrors([
				{
					msg: 'cannot be empty',
				},
			]);
			return;
		} else if (boardName.length > 15) {
			setErrors([
				{
					msg: 'cannot be more than 15 characters',
				},
			]);
			return;
		}

		const boardData = {
			name: boardName,
		};

		if (isUpdate) {
			dispatch(updateBoard({ boardId: board._id, boardData }));
			setIsUpdate(false);
			setModalMode('addBoard');
			setShowModal(false);
			navigate(0);
		} else if (!errors.length) {
			// create board
			dispatch(createBoard(boardData)).then(res => {
				// Navigate to new board
				navigate(`/dashboard/boards/${res.payload._id}`);
			});
			setShowModal(false);
		}
	};

	return (
		<div className='kanban__add-board'>
			<form onSubmit={onSubmitHandler}>
				<div className='kanban__add-board_heading'>
					<label htmlFor='board-name'>Board Name</label>
					<input
						className={errors.length ? 'kanban__add-board_input-error' : ''}
						type='text'
						placeholder='e.g Marketing Plan'
						value={boardName}
						onChange={e => setBoardName(e.target.value)}
					/>
					<Error errors={errors} />
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
