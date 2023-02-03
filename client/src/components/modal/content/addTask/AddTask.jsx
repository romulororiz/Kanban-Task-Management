import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { createTask, updateTask, getTaskById } from '@features/tasks/taskSlice';
import { GoKebabVertical } from 'react-icons/go';
import { useParams, useNavigate } from 'react-router-dom';
import '@styles/scss/modal/addTask/AddTask.scss';

const AddTask = ({ setShowModal, modalMode, setModalMode, column }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: '',
		subTasks: [],
	});
	const [isUpdate, setIsUpdate] = useState(false);
	const [errors, setErrors] = useState([]);

	// destructure form data
	const { title, description, status, subTasks } = formData;

	// get data from store
	const { isLoading, columns } = useSelector(state => state.column);
	const { errors: taskErrors, task } = useSelector(state => state.task);

	console.log(column);

	// initialize dispatch
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { taskId } = useParams();

	// handle input change
	const onChangeHandler = e => {
		const { name, value } = e.target;

		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	// check modal mode
	useEffect(() => {
		if (modalMode === 'updateTask') {
			setIsUpdate(true);
			setFormData(task);
		}
	}, [modalMode, dispatch, task]);

	// clear errors on empty input and get task by id
	useEffect(() => {
		if (errors.length) {
			setTimeout(() => {
				setErrors([]);
			}, 3000);
		}

		if (isUpdate || modalMode === 'viewTask') {
			dispatch(getTaskById(taskId));
		}
	}, [dispatch, errors.length, isUpdate, modalMode, taskId]);

	// Submit new column / edit column and save to the database
	const onSubmit = useCallback(
		e => {
			e.preventDefault();

			// if (!title || !description || !status) {
			// 	// concatenate all errors into one array
			// 	const allErrors = [
			// 		...(!title ? ['Title is required'] : []),
			// 		...(!description ? ['Description is required'] : []),
			// 		...(!status ? ['Status is required'] : []),
			// 	];

			// 	setErrors(allErrors);

			// 	return;
			// }

			const taskData = {
				title,
				description,
				status,
				subTasks,
			};

			if (isUpdate) {
				dispatch(updateTask({ taskId, taskData }));
				setIsUpdate(false);
				setModalMode('addTask');
				setShowModal(false);
				navigate(-1)
			} else {
				dispatch(createTask({ columnId: status, taskData }));
				setShowModal(false);
			}
		},
		[
			dispatch,
			title,
			description,
			status,
			subTasks,
			isUpdate,
			setModalMode,
			setShowModal,
			errors,
		]
	);

	return (
		<>
			<div className='kanban__add-task'>
				<form onSubmit={onSubmit}>
					<div className='kanban__add-task_heading'>
						{modalMode === 'viewTask' ? (
							<div className='kanban__task-title_container'>
								<h3>{task.title}</h3>
								<GoKebabVertical onClick={() => setModalMode('updateTask')} />
							</div>
						) : (
							<>
								<label htmlFor='title'>Title</label>
								<input
									className={
										errors.length ? 'kanban__add-task_input-error' : ''
									}
									placeholder='e.g Todo'
									name='title'
									value={title}
									onChange={onChangeHandler}
									type='text'
								/>
							</>
						)}
						{modalMode === 'viewTask' ? (
							<p>{task.description}</p>
						) : (
							<>
								<label htmlFor='description'>Description</label>
								<textarea
									className={
										errors.length ? 'kanban__add-task_input-error' : ''
									}
									placeholder='e.g Todo'
									name='description'
									value={description}
									onChange={onChangeHandler}
								/>
							</>
						)}
						{modalMode === 'viewTask' ? (
							<p>{column.name}</p>
						) : (
							<>
								<label htmlFor='status'>Status</label>
								<select
									className={
										errors.length ? 'kanban__add-task_input-error' : ''
									}
									type='text'
									placeholder='e.g Todo'
									name='status'
									value={status}
									onChange={onChangeHandler}
								>
									<option value='' disabled>
										Select a column
									</option>
									{columns.map(column => (
										<option key={column._id} value={column._id}>
											{column.name}
										</option>
									))}
								</select>
							</>
						)}
					</div>

					{modalMode === 'viewTask' ? (
						''
					) : (
						<div className='kanban__modal-footer'>
							<button type='submit' className='kanban__modal-button'>
								{isUpdate ? 'Update' : 'Create'}
							</button>
						</div>
					)}
				</form>
			</div>
		</>
	);
};

export default AddTask;
