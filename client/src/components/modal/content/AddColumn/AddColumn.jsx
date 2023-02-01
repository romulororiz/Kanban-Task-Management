import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumn, createColumn } from '@features/columns/columnSlice';
import { GithubPicker } from 'react-color';
import { useParams } from 'react-router-dom';
import '@styles/scss/modal/addColumn/AddColumn.scss';

const AddColumn = ({ setShowModal, modalMode, setModalMode, column }) => {
	const [columnName, setColumnName] = useState('');
	const [columnColor, setColumnColor] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);
	const [errors, setErrors] = useState([]);

	// get data from store
	const { isLoading, errors: addColumnErrors } = useSelector(
		state => state.column
	);

	// get boardId from url
	const { id: boardId } = useParams();

	// initialize dispatch
	const dispatch = useDispatch();

	// check modal mode
	useEffect(() => {
		if (modalMode === 'updateColumn') {
			setIsUpdate(true);
			setColumnName(column.name);
			setColumnColor(column.color);
		}
	}, [modalMode, dispatch]);

	// set errors to loginErrors if there are any
	useEffect(() => {
		if (addColumnErrors) {
			setErrors(addColumnErrors);
		}

		if (errors) {
			setTimeout(() => {
				setErrors([]);
			}, 5000);
		}
	}, [addColumnErrors]);

	// Submit new column to database
	const onSubmitHandler = e => {
		e.preventDefault();

		const columnData = {
			name: columnName,
			color: columnColor,
		};

		if (isUpdate) {
			dispatch(updateColumn({ columnData, columnId: column._id }));
			setIsUpdate(false);
			setModalMode('addColumn');
		} else {
			dispatch(createColumn({ boardId: boardId, columnData }));
		}

		// Close modal
		setShowModal(false);
	};

	return (
		<div className='kanban__add-column'>
			<form onSubmit={onSubmitHandler}>
				<div className='kanban__add-column_heading'>
					<label htmlFor='column-name'>Column Name</label>
					<input
						type='text'
						placeholder='e.g Todo'
						name='columnName'
						// todo - add loading state
						value={isUpdate && isLoading ? 'Loading...' : columnName}
						onChange={e => setColumnName(e.target.value)}
					/>
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
						{isUpdate ? 'Update Column' : 'Create Column'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddColumn;
