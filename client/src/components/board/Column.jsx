import TaskItem from './TaskItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTasks } from '@features/tasks/taskSlice';
import { GoKebabVertical } from 'react-icons/go';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { deleteColumn } from '@features/columns/columnSlice';
import { useParams } from 'react-router-dom';
import '@styles/scss/boards/Column.scss';

const Column = ({ column }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	// create ref for dropdown
	const dropdownRef = useRef();

	// initialize useOnClickOutside hook
	useOnClickOutside(dropdownRef, () => setShowDropdown(false));

	// get name from column
	const { name, _id: id } = column;

	// get tasks from store
	const { tasks } = useSelector(state => state.task);

	// initialize dispatch
	const dispatch = useDispatch();

	// get boardId from url
	const { id: boardId } = useParams();

	// get tasks from board
	useEffect(() => {
		if (boardId) {
			dispatch(getBoardTasks(boardId));
		}
	}, [boardId]);

	// Check if column has tasks
	const hasTasks = useMemo(() => {
		return tasks && tasks.filter(task => task.column === id).length > 0;
	}, [tasks, id]);

	// Handle delete column
	const handleDeleteColumn = id => {
		dispatch(deleteColumn(id));
	};

	return (
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
					ref={dropdownRef}
					className={`${
						showDropdown
							? 'kanban__dashboard-column_dropdown'
							: 'kanban__dashboard-column_dropdown-hide'
					}`}
				>
					<ul>
						<li>
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
	);
};
export default Column;
