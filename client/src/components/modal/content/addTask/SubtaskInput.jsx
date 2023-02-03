import { FaTimes } from 'react-icons/fa';
import '@styles/scss/modal/addTask/SubtaskInput.scss';

const SubtaskInput = ({ subtask, onChange, onRemove, index }) => {
	return (
		<div className='kanban__add-task_subtask-input'>
			<input
				className={subtask.title && 'kanban__add-task_subtask-input_disabled'}
				disabled={subtask.title}
				type='text'
				placeholder='e.g Make Coffee'
				value={subtask.title}
				onChange={onChange}
			/>
			{onRemove && (
				<FaTimes
					className='kanban__add-task_remove-icon'
					onClick={() => onRemove(index)}
				/>
			)}
		</div>
	);
};

export default SubtaskInput;
