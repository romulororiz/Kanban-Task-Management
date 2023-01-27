import { useState } from 'react';
import { createBoard } from '@features/boards/boardSlice';
import { createColumn } from '@features/columns/columnSlice';
import ColumnInput from './ColumnInput';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '@styles/scss/modal/addBoard/AddBoard.scss';

const AddBoard = ({ setShowModal }) => {
	const [boardName, setBoardName] = useState('');

	// initialize dispatch
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Handle input changes
	const onChangeHandler = e => {
		// update state
		setBoardName(e.target.value);
	};

	// Submit new board to database
	const onSubmitHandler = e => {
		e.preventDefault();

		// prevent submitting empty board
		// todo handle error
		if (boardName === '') return;

		const boardData = {
			name: boardName,
		};

		// Dispatch action to create new board
		dispatch(createBoard(boardData)).then(res => {
			// Navigate to new board
			navigate(`/dashboard/boards/${res.payload._id}`);
		});

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
						placeholder='Board Name'
						name='name'
						value={boardName}
						onChange={onChangeHandler}
					/>
				</div>
				{/* <div className='kanban__add-board_columns'>
					<div className='kanban__add-board_columns-input'>
						<label htmlFor='columnName'>Columns</label>
						{columns.map(({ name }, idx) => (
							<ColumnInput
								key={idx}
								index={idx}
								column={name}
								onChange={onChangeHandler}
								onRemove={onRemoveColumnHandler}
							/>
						))}
						<ColumnInput onChange={onChangeHandler} />
					</div>
				</div> */}
				{/* <button
					type='button'
					className='kanban__add-board_add-column_button'
					onClick={onAddColumnHandler}
				>
					+ Add Column
				</button> */}
				<div className='kanban__modal-footer'>
					<button type='submit' className='kanban__modal-button'>
						Create New Board
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddBoard;
