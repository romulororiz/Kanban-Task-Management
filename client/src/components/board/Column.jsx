import TaskItem from './TaskItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTasks } from '@features/tasks/taskSlice';
import { GoKebabVertical } from 'react-icons/go';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { deleteColumn } from '@features/columns/columnSlice';
import { useParams } from 'react-router-dom';
import Modal from '@components/modal/Modal';
import AddColumn from '@components/modal/content/AddColumn/AddColumn';
import useConfirmAlert from '@hooks/useConfirmAlert';
import '@styles/scss/boards/Column.scss';

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

	// get useConfirm hook
	const [setTitle, setMessage, setButtons] = useConfirmAlert();

	// get name from column
	const { name, _id: id } = column;

	// get tasks from store
	const { tasks } = useSelector(state => state.task);

	// initialize dispatch
	const dispatch = useDispatch();

	// get tasks from board
	// useEffect(() => {
	// 	if (boardId) {
	// 		dispatch(getBoardTasks(boardId));
	// 	}
	// }, [boardId]);

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
		setModalMode('updateColumn');
		setShowModal(true);
		setShowDropdown(false);
	};

	return (
		<>
			{showModal && (
				<Modal
					title={modalMode === 'addColumn' ? 'Add Column' : 'Edit Column'}
					setModalMode={setModalMode}
					modalMode={modalMode}
					setShowModal={setShowModal}
					showModal={showModal}
					content={
						<AddColumn
							setShowModal={setShowModal}
							column={column}
							modalMode={modalMode}
							setModalMode={setModalMode}
						/>
					}
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
					{tasks &&
						tasks
							.filter(task => task.column === id)
							.map(task => <TaskItem key={task._id} task={task} />)}
				</div>
			</div>
		</>
	);
};
export default Column;
