import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { createTask, updateTask, getTaskById } from '@features/tasks/taskSlice';
import { GoKebabVertical } from 'react-icons/go';
import '@styles/scss/modal/addTask/AddTask.scss';
import { useParams } from 'react-router-dom';

const AddTask = ({ setShowModal, modalMode, setModalMode }) => {
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

	// initialize dispatch
	const dispatch = useDispatch();
	const { taskId } = useParams();

	// on change handler
	const onChangeHandler = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	// check modal mode
	useEffect(() => {
		if (modalMode === 'updateTask') {
			setIsUpdate(true);
			setFormData({
				title: task.title,
				description: task.description,
				status: task.status,
				subTasks: task.subTasks,
			});
		}
	}, [modalMode, dispatch, title, description, status, subTasks, taskErrors]);

	// clear errors on empty input
	useEffect(() => {
		if (errors.length) {
			setTimeout(() => {
				setErrors([]);
			}, 3000);
		}

		if (isUpdate || modalMode === 'viewTask') {
			dispatch(getTaskById(taskId));
		}
	}, [errors]);

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
									type='text'
									placeholder='e.g Todo'
									name={isUpdate ? 'task.title' : 'title'}
									// todo - add loading state
									value={isUpdate ? task.title : title}
									onChange={onChangeHandler}
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
									// todo - add loading state
									value={isUpdate ? task.description : description}
									onChange={onChangeHandler}
								/>
							</>
						)}
						{modalMode === 'viewTask' ? (
							<p>{task.status}</p>
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
									// todo - add loading state
									value={isUpdate ? task.status : status}
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
