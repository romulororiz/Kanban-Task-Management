import { useNavigate } from 'react-router-dom';
import '@styles/scss/boards/TaskItem.scss';

const TaskItem = ({ task, setShowModal, setModalMode, theme }) => {
	// initialize navigate
	const navigate = useNavigate();

	// get number of subtasks
	const { title, subtasks } = task;

	// handle update task
	const handleViewTask = () => {
		setModalMode('viewTask');
		setShowModal(true);
		navigate(
			`/dashboard/boards/${task.board}/column/${task.column}/task/${task._id}`
		);
	};

	// get completed subtasks
	const completedSubtasks = task.subtasks.filter(
		subtask => subtask.isCompleted
	).length;

	return (
		<div
			className={`${
				theme === 'dark'
					? 'kanban__dashboard-task_item-dark'
					: 'kanban__dashboard-task_item'
			}`}
			onClick={handleViewTask}
		>
			<div className='kanban__dashboard-task_item-title'>
				<h3>{title}</h3>
			</div>
			{/* <div className='kanban__dashboard-task_item-subtasks'>
				<p>{`${completedSubtasks} of ${subtasks.length} completed`}</p>
			</div> */}
		</div>
	);
};
export default TaskItem;
