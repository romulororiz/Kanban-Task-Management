import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '@styles/scss/boards/TaskItem.scss';

const TaskItem = ({ task }) => {
	// get number of subtasks
	const { title, subtasks } = task;

	return (
		<div className='kanban__dashboard-task_item'>
			<div className='kanban__dashboard-task_item-title'>
				<h3>{title}</h3>
			</div>
			<div className='kanban__dashboard-task_item-subtasks'>
				<p>{`0 of ${subtasks.length} subtasks completed`}</p>
			</div>
		</div>
	);
};
export default TaskItem;
