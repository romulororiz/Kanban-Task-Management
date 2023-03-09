import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createTask,
	updateTask,
	getTaskById,
	deleteTask,
} from '@features/tasks/taskSlice';
import { useThemeContext } from '@hooks/useThemeContext';
import { TiPlus } from 'react-icons/ti';
import { GoKebabVertical } from 'react-icons/go';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import SubtaskInput from './SubtaskInput';
import SubtaskItem from './SubtaskItem';
import Error from '@components/Error';
import Spinner from '@components/Spinner';
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

	const { title, description, status, subtasks } = formData;

	// get theme from context
	const {
		state: { theme },
	} = useThemeContext();

	// get data from store
	const { columns } = useSelector(state => state.column);
	const { task, isLoading } = useSelector(state => state.task);

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

		if (!subtaskTitle.length) {
			setErrors([
				{
					msg: 'cannot be empty',
					param: 'subtask',
				},
			]);
			return;
		}

		setFormData(prevState => ({
			...prevState,
			subtasks: [...prevState.subtasks, subtaskData],
		}));

		setSubtaskTitle('');
	};

	// handle remove subtask input from array
	const onRemoveSubtask = index => {
		setFormData(prevState => ({
			...prevState,
			subtasks: prevState.subtasks.filter((_, i) => i !== index),
		}));
	};

	// Submit new column / edit column and save to the database
	const onSubmit = useCallback(
		e => {
			e.preventDefault();

			if (!title || !description || !status) {
				// concatenate all errors into one array
				const allErrors = [
					...(!title
						? [
								{
									msg: 'cannot be empty',
									param: 'title',
								},
						  ]
						: []),
					...(!description
						? [
								{
									msg: 'cannot be empty',
									param: 'description',
								},
						  ]
						: []),
					...(!status
						? [
								{
									msg: 'Select a status',
									param: 'status',
								},
						  ]
						: []),
				];

				setErrors(allErrors);

				return;
			}

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
		[dispatch, title, description, status, subtasks, isUpdate, errors]
	);

	// handle update task
	const onUpdateTaskDropdown = () => {
		setModalMode('updateTask');
		setShowDropdown(false);
	};

	// handle delete task
	const onDeleteTaskDropdown = id => {
		dispatch(deleteTask(id));
		setShowDropdown(false);
		setShowModal(false);
		navigate(-1);
	};

	// get completed subtasks count
	// todo - make it update in real time
	const completedSubtasks = task.subtasks?.filter(
		subtask => subtask.isCompleted
	).length;

	if (isLoading) {
		return (
			<div className='kanban__loader'>
				<Spinner />
			</div>
		);
	}

	return (
		<div className='kanban__add-task'>
			<form onSubmit={onSubmit}>
				{modalMode === 'viewTask' ? (
					<div className='kanban__task-title_container'>
						<h3>{task.title}</h3>
						<GoKebabVertical onClick={dropdownHandler} />
						{showDropdown && (
							<div
								className={`${
									theme === 'dark'
										? 'kanban__add-task_dropdown-dark'
										: 'kanban__add-task_dropdown'
								}`}
							>
								<ul>
									<li onClick={onUpdateTaskDropdown}>
										<FaRegEdit />
										Edit
									</li>
									<li onClick={() => onDeleteTaskDropdown(taskId)}>
										<FaRegTrashAlt />
										Delete
									</li>
								</ul>
							</div>
						)}
					</div>
				) : (
					<div className='kanban__task-title_container-add-update'>
						<label htmlFor='title'>Title</label>
						<input
							className={
								errors.map(err => err.param).includes('title')
									? 'kanban__add-task_input-error'
									: ''
							}
							placeholder='e.g. Take coffee break'
							name='title'
							value={title}
							onChange={onChangeHandler}
							type='text'
						/>
						<Error errors={errors} errorParam='title' />
					</div>
				)}

				{modalMode === 'viewTask' ? (
					<p className='kanban__add-task_description'>{task.description}</p>
				) : (
					<div className='kanban__add-task_description-update'>
						<label htmlFor='description'>Description</label>
						<textarea
							className={
								errors.map(err => err.param).includes('description')
									? 'kanban__add-task_input-error'
									: ''
							}
							placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
							name='description'
							value={description}
							onChange={onChangeHandler}
						/>
						<Error errors={errors} errorParam='description' />
					</div>
				)}

				{/* {modalMode === 'viewTask' ? (
						<>
							<p className='kanban__add-task_subtasks-count'>
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
										onRemove={onRemoveSubtask}
									/>
								))}
								<SubtaskInput
									subtask={subtaskTitle}
									onChange={onSubtaskChange}
									errors={errors}
								/>
								<Error errors={errors} errorParam='subtask' />
							</div>
							<button
								className={
									theme === 'dark'
										? 'kanban__add-task_subtasks-btn-dark'
										: 'kanban__add-task_subtasks-btn'
								}
								onClick={onAddSubtask}
							>
								<TiPlus />
								Add New Subtask
							</button>
						</>
					)} */}

				<div className='kanban__add-task_status-container'>
					<label htmlFor='status'>
						{modalMode === 'viewTask' ? 'Current Status' : 'Status'}
					</label>
					<select
						className={
							errors.map(err => err.param).includes('status')
								? 'kanban__add-task_input-error'
								: ''
						}
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
					<Error errors={errors} errorParam='status' />
				</div>
				{modalMode === 'viewTask' ? null : (
					<div className='kanban__modal-footer'>
						<button type='submit' className='kanban__modal-button'>
							{isUpdate ? 'Update' : 'Create'}
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default AddTask;
