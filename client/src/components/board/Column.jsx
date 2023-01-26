import TaskItem from './TaskItem';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTasks } from '../../features/tasks/taskSlice';
import { useParams } from 'react-router-dom';
import '@styles/scss/boards/Column.scss';

const Column = ({ column }) => {
	// get name from column
	const { name, _id } = column;

	// get tasks from store
	const { tasks } = useSelector(state => state.task);

	// initialize dispatch
	const dispatch = useDispatch();

	// get boardId from url
	const { id: boardId } = useParams();

	// get tasks from column
	useEffect(() => {
		dispatch(getBoardTasks(boardId));
	}, [boardId]);

	// Check if column has tasks
	const hasTasks = useMemo(() => {
		return tasks.filter(task => task.column === _id).length > 0;
	}, [tasks, _id]);

	return (
		<div className='kanban__dashboard-column'>
			<div className='kanban__dashboard-column_heading'>
				<div
					className='kanban__dashboard-column_title-marker'
					style={{ backgroundColor: column.color }}
				></div>
				<h3 className='kanban__dashboard-column_title'>{`${name} (${
					tasks.filter(task => task.column === _id).length
				})`}</h3>
			</div>
			<div className={hasTasks ? 'kanban__dashboard-column_tasks-container' : 'kanban__dashboard-column_tasks-container kanban__dashboard-column_tasks-container_empty'}>
				{tasks &&
					tasks
						.filter(task => task.column === _id)
						.map(task => <TaskItem key={task._id} task={task} />)}
			</div>
		</div>
	);
};
export default Column;
