import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createTask,
	updateTask,
	getTaskById,
	deleteTask,
} from '@features/tasks/taskSlice';
import { GoKebabVertical } from 'react-icons/go';
import { TiPlus } from 'react-icons/ti';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import SubtaskInput from './SubtaskInput';
import SubtaskItem from './SubtaskItem';
import '@styles/scss/modal/addTask/AddTask.scss';

const AddTask = ({ setShowModal, modalMode, setModalMode }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: '',
		subtasks: [],
	});
	const [isUpdate, setIsUpdate] = useState(false);
	const [errors, setErrors] = useState([]);
	const [subtaskTitle, setSubtaskTitle] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);

	// destructure form data
	const { title, description, status, subtasks } = formData;

	// get data from store
	const { columns } = useSelector(state => state.column);
	const { errors: taskErrors, task } = useSelector(state => state.task);

	// handle dropdown
	const dropdownHandler = useCallback(() => {
		setShowDropdown(prevState => !prevState);
	}, []);

	// initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// get task id from url
	const { taskId } = useParams();

	// check modal mode
	useEffect(() => {
		if (modalMode === 'updateTask') {
			setIsUpdate(true);
			setFormData(task);
		}
	}, [modalMode, dispatch, task]);

	// handle input change
	const onChangeHandler = e => {
		const { name, value } = e.target;

		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));

		if (name === 'status' && modalMode === 'viewTask') {
			dispatch(updateTask({ taskId, taskData: { status: value } }));
		}
	};

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

	// handle subtask input change
	const onSubtaskChange = e => {
		const { value } = e.target;
		setSubtaskTitle(value);
	};

	// handle add subtask input to array
	const onAddSubtask = e => {
		e.preventDefault();

		const subtaskData = {
			title: subtaskTitle,
		};

		// // check if subtask title is empty
		// if (!subtaskTitle) {
		// 	return;
		// }

		setFormData(prevState => ({
			...prevState,
			subtasks: [...prevState.subtasks, subtaskData],
		}));

		setSubtaskTitle('');
	};

	// handle remove subtask input from array
	const onRemoveSubtaskDropdown = index => {
		setFormData(prevState => ({
			...prevState,
			subtasks: prevState.subtasks.filter((_, i) => i !== index),
		}));
	};

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
				subtasks,
			};

			if (isUpdate) {
				dispatch(updateTask({ taskId, taskData }));
				setIsUpdate(false);
				setModalMode('addTask');
				setShowModal(false);
				navigate(-1);
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
			subtasks,
			isUpdate,
			setModalMode,
			setShowModal,
			errors,
		]
	);

	// handle update task
	const onUpdateTaskDropdown = () => {
		setModalMode('updateTask');
		setShowDropdown(false);
	};

	// handle delete task
	const onDeleteTask = id => {
		dispatch(deleteTask(id));
		setShowDropdown(false);
		setShowModal(false);
		navigate(-1);
	};

	// get completed subtasks count
	const completedSubtasks = task.subtasks?.filter(
		subtask => subtask.isCompleted
	).length;

	return (
		<>
			<div className='kanban__add-task'>
				<form onSubmit={onSubmit}>
					{modalMode === 'viewTask' ? (
						<div className='kanban__task-title_container'>
							<h3>{task.title}</h3>
							<GoKebabVertical onClick={dropdownHandler} />
							{showDropdown && (
								<div className='kanban__add-task_dropdown'>
									<ul>
										<li onClick={onUpdateTaskDropdown}>
											<FaRegEdit />
											Edit
										</li>
										<li onClick={() => onDeleteTask(taskId)}>
											<FaRegTrashAlt />
											Delete
										</li>
									</ul>
								</div>
							)}
						</div>
					) : (
						<div className='kanban__task-title_container-update'>
							<label htmlFor='title'>Title</label>
							<input
								className={errors.length ? 'kanban__add-task_input-error' : ''}
								placeholder='e.g. Take coffee break'
								name='title'
								value={title}
								onChange={onChangeHandler}
								type='text'
							/>
						</div>
					)}

					{modalMode === 'viewTask' ? (
						<p className='kanban__add-task_description'>{task.description}</p>
					) : (
						<div className='kanban__add-task_description-update'>
							<label htmlFor='description'>Description</label>
							<textarea
								className={errors.length ? 'kanban__add-task_input-error' : ''}
								placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
								name='description'
								value={description}
								onChange={onChangeHandler}
							/>
						</div>
					)}

					{modalMode === 'viewTask' ? (
						<>
							<p>
								Subtasks ({completedSubtasks} of {task.subtasks?.length})
							</p>
							<div className='kanban__add-task-subtasks_container'>
								{task.subtasks?.map((subtask, index) => (
									<SubtaskItem
										key={index}
										index={index}
										subtask={subtask}
										task={task}
									/>
								))}
							</div>
						</>
					) : (
						<>
							<p>Subtasks</p>
							<div className='kanban__add-task_subtasks-container_add-update'>
								{subtasks?.map((subtask, index) => (
									<SubtaskInput
										key={index}
										index={index}
										subtask={subtask}
										onChange={onSubtaskChange}
										onRemove={onRemoveSubtaskDropdown}
									/>
								))}
								<SubtaskInput
									subtask={subtaskTitle}
									onChange={onSubtaskChange}
								/>
							</div>
							<button
								className='kanban__add-task_subtasks-btn'
								onClick={onAddSubtask}
							>
								<TiPlus />
								Add New Subtask
							</button>
						</>
					)}

					<div className='kanban__add-task_status-container'>
						<label htmlFor='status'>
							{modalMode === 'viewTask' ? 'Current Status' : 'Status'}
						</label>
						<select
							className={errors.length ? 'kanban__add-task_input-error' : ''}
							type='text'
							placeholder='e.g Todo'
							name='status'
							value={status}
							onChange={onChangeHandler}
						>
							<option value=''>Select a column</option>
							{columns.map(column => (
								<option key={column._id} value={column._id}>
									{column.name}
								</option>
							))}
						</select>
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
