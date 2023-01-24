import '@styles/scss/boards/Column.scss';
import TaskItem from './TaskItem';
import { generateRandomColor } from '../../utils/generateRandomColor';

const Column = ({ name }) => {
	// generate a random color for the column title marker
	const color = generateRandomColor();

	return (
		<div className='kanban__dashboard-column'>
			<div className='kanban__dashboard-column_heading'>
				<div
					className='kanban__dashboard-column_title-marker'
					style={{ backgroundColor: color }}
				></div>
				<h3 className='kanban__dashboard-column_title'>Todo</h3>
			</div>
			<TaskItem />
			<TaskItem />
			<TaskItem />
			<TaskItem />
			<TaskItem />
			<TaskItem />
			<TaskItem />
			<TaskItem />
		</div>
	);
};
export default Column;
