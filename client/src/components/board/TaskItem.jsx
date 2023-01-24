import '@styles/scss/boards/TaskItem.scss';

const TaskItem = () => {
	return (
		<div className='kanban__dashboard-task_item'>
			<div className='kanban__dashboard-task_item-title'>
				<h3>Build UI for onboarding flow</h3>
			</div>
			<div className='kanban__dashboard-task_item-subtasks'>
				<p>0 of 3 substasks</p>
			</div>
		</div>
	);
};
export default TaskItem;
