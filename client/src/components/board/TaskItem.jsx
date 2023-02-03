import '@styles/scss/boards/TaskItem.scss';

const TaskItem = ({
	task,
	showModal,
	setShowModal,
	setModalMode,
	modalMode,
}) => {
	// get number of subtasks
	const { title, subtasks } = task;

	// handle update task
	const handleUpdateTask = () => {
		setModalMode('viewTask');
		setShowModal(true);
	};

	return (
		<div className='kanban__dashboard-task_item' onClick={handleUpdateTask}>
			<div className='kanban__dashboard-task_item-title'>
				<h3>{title}</h3>
			</div>
			<div className='kanban__dashboard-task_item-subtasks'>
				<p>{`0 of ${subtasks && subtasks.length} completed`}</p>
			</div>
		</div>
	);
};
export default TaskItem;
