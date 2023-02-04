import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoKebabVertical } from 'react-icons/go';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { getBoardTasks } from '@features/tasks/taskSlice';
import { deleteColumn } from '@features/columns/columnSlice';
import { useParams, useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';
import Modal from '@components/modal/Modal';
import AddColumn from '@components/modal/content/addColumn/AddColumn';
import useConfirmAlert from '@hooks/useConfirmAlert';
import useOnClickOutside from '@hooks/useOnClickOutside';
import '@styles/scss/boards/Column.scss';
import AddTask from '../modal/content/addTask/AddTask';

const Column = ({ column }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState('addColumn');

	// create ref for dropdown and modal
	const DropdownRef = useRef();

	// initialize useOnClickOutside hook
	useOnClickOutside(DropdownRef, () => {
		setShowDropdown(false);
	});

	// get board id from params
	const { id: boardId } = useParams();

	// get useConfirm hook
	const [setTitle, setMessage, setButtons] = useConfirmAlert();

	// get name and id from column
	const { name, _id: id } = column;

	// get tasks from store
	const { tasks } = useSelector(state => state.task);

	console.log(tasks)

	// initialize dispatch
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// get tasks from board
	useEffect(() => {
		if (boardId) {
			dispatch(getBoardTasks(boardId));
		}
	}, [boardId, dispatch]);

	// Check if column has tasks
	const hasTasks = useMemo(() => {
		return tasks && tasks.filter(task => task.column === id).length > 0;
	}, [tasks, id]);

	// Handle delete column
	const handleDeleteColumn = id => {
		// confirm alert
		setTitle('Delete this column?');
		setMessage(
			`Are you sure you want to delete the ‘${column.name}’ column? This action will remove all tasks and cannot be reversed.`
		);
		setButtons([
			{
				label: 'Delete',
				onClick: () => {
					dispatch(deleteColumn(id));
				},
			},
			{
				label: 'Cancel',
				onClick: () => {},
			},
		]);
	};

	// handle update column
	const handleUpdateColumn = () => {
		navigate(`/dashboard/boards/${boardId}/column/${id}`);
		setModalMode('updateColumn');
		setShowModal(true);
		setShowDropdown(false);
	};

	// handle modal title
	const modalTitle = useMemo(() => {
		switch (modalMode) {
			case 'addColumn':
				return 'Add a column';
			case 'updateColumn':
				return 'Update column';
			case 'addTask':
				return 'Add a task';
			case 'updateTask':
				return 'Update task';
			case 'viewTask':
				return '';
			default:
				break;
		}
	}, [modalMode]);

	// handle content
	const content = useMemo(() => {
		switch (modalMode) {
			case 'updateColumn':
				return (
					<AddColumn
						setShowModal={setShowModal}
						column={column}
						modalMode={modalMode}
						setModalMode={setModalMode}
					/>
				);
			case 'viewTask':
				return (
					<AddTask
						setShowModal={setShowModal}
						modalMode={modalMode}
						setModalMode={setModalMode}
						column={column}
					/>
				);
			case 'updateTask':
				return (
					<AddTask
						setShowModal={setShowModal}
						modalMode={modalMode}
						setModalMode={setModalMode}
						column={column}
					/>
				);
			default:
				break;
		}
	}, [modalMode]);

	return (
		<>
			{showModal && (
				<Modal
					title={modalTitle}
					setModalMode={setModalMode}
					modalMode={modalMode}
					setShowModal={setShowModal}
					showModal={showModal}
					content={content}
				/>
			)}
			<div className='kanban__dashboard-column'>
				<div className='kanban__dashboard-column_heading'>
					<div className='kanban__dashboard-column_heading-title_container'>
						<div
							className='kanban__dashboard-column_title-marker'
							style={{ backgroundColor: column.color }}
						></div>
						<h3 className='kanban__dashboard-column_title'>{`${name} (${
							tasks.filter(task => task.column === id).length
						})`}</h3>
					</div>
					<GoKebabVertical
						className='kanban__dashboard-column_heading-icon'
						onClick={() => setShowDropdown(true)}
					/>
					{/* create dropdown for column */}
					<div
						ref={DropdownRef}
						className={`${
							showDropdown
								? 'kanban__dashboard-column_dropdown'
								: 'kanban__dashboard-column_dropdown-hide'
						}`}
					>
						<ul>
							<li onClick={handleUpdateColumn}>
								<FaRegEdit />
								Edit Column
							</li>
							<li onClick={() => handleDeleteColumn(id)}>
								<FaRegTrashAlt />
								Delete Column
							</li>
						</ul>
					</div>
				</div>
				<div
					className={
						hasTasks
							? 'kanban__dashboard-column_tasks-container'
							: 'kanban__dashboard-column_tasks-container kanban__dashboard-column_tasks-container_empty'
					}
				>
					{tasks
						.filter(task => task.column === id)
						.map(task => (
							<TaskItem
								key={task._id}
								task={task}
								subtasks={task.subtasks}
								showModal={showModal}
								modalMode={modalMode}
								setShowModal={setShowModal}
								setModalMode={setModalMode}
							/>
						))}
				</div>
			</div>
		</>
	);
};
export default Column;
