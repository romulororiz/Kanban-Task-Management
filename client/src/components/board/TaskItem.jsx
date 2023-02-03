import { useNavigate } from 'react-router-dom';
import '@styles/scss/boards/TaskItem.scss';

const TaskItem = ({
	task,
	showModal,
	setShowModal,
	setModalMode,
	modalMode,
}) => {
	console.log(task);
	// initialize navigate
	const navigate = useNavigate();

	// get number of subtasks
	const { title, subtasks } = task;

	// handle update task
	const handleUpdateTask = () => {
		setModalMode('viewTask');
		setShowModal(true);
		navigate(`/dashboard/boards/${task.board}/tasks/${task._id}`);
	};

	return (
		<div className='kanban__dashboard-task_item' onClick={handleUpdateTask}>
			<div className='kanban__dashboard-task_item-title'>
				<h3>{title}</h3>
			</div>
			{subtasks ? (
				<div className='kanban__dashboard-task_item-subtasks'>
					<p>{`0 of ${subtasks && subtasks.length} completed`}</p>
				</div>
			) : (
				''
			)}
		</div>
	);
};
export default TaskItem;
