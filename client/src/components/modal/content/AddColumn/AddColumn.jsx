import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateColumn, createColumn } from '@features/columns/columnSlice';
import { GithubPicker } from 'react-color';
import { useCallback } from 'react';
import Error from '@components/Error';
import '@styles/scss/modal/addColumn/AddColumn.scss';

const AddColumn = ({
	setShowModal,
	modalMode,
	setModalMode,
	column,
	board,
}) => {
	const [columnName, setColumnName] = useState('');
	const [columnColor, setColumnColor] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);
	const [errors, setErrors] = useState([]);

	// initialize dispatch
	const dispatch = useDispatch();

	// check modal mode
	useEffect(() => {
		if (modalMode === 'updateColumn') {
			setIsUpdate(true);
			setColumnName(column.name);
			setColumnColor(column.color);
		}
	}, [modalMode, column]);

	// clear errors on empty input
	useEffect(() => {
		if (errors.length) {
			setTimeout(() => {
				setErrors([]);
			}, 3000);
		}
	}, [errors]);

	// Submit new column / edit column and save to the database
	const onSubmit = useCallback(
		e => {
			e.preventDefault();

			if (!columnName) {
				setErrors([
					{
						msg: 'cannot be empty',
					},
				]);
				return;
			} else if (columnName.length > 15) {
				setErrors([
					{
						msg: 'cannot be more than 15 characters',
					},
				]);
				return;
			}

			const columnData = {
				name: columnName,
				color: columnColor,
			};

			if (isUpdate) {
				dispatch(updateColumn({ columnData, columnId: column._id }));
				setIsUpdate(false);
				setModalMode('addColumn');
				setShowModal(false);
			} else if (!errors.length) {
				dispatch(createColumn({ columnData, boardId: board._id }));
				setShowModal(false);
			}
		},
		[columnName, columnColor, isUpdate, dispatch]
	);

	return (
		<>
			<div className='kanban__add-column'>
				<form onSubmit={onSubmit}>
					<div className='kanban__add-column_heading'>
						<label htmlFor='column-name'>Column Name</label>
						<input
							className={errors.length ? 'kanban__add-column_input-error' : ''}
							type='text'
							placeholder='e.g Todo'
							// todo - add loading state
							value={columnName}
							onChange={e => setColumnName(e.target.value)}
						/>
						<Error errors={errors} />
					</div>
					<div className='kanban__add-column_color'>
						<label htmlFor='column-color'>Column Color</label>
						<GithubPicker
							className='kanban__add-column_color-picker'
							color={columnColor}
							onChangeComplete={color => setColumnColor(color.hex)}
						/>
					</div>
					<div className='kanban__modal-footer'>
						<button type='submit' className='kanban__modal-button'>
							{isUpdate ? 'Update' : 'Create'}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default AddColumn;
