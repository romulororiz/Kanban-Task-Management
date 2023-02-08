import { FaTimes } from 'react-icons/fa';
import '@styles/scss/modal/addTask/SubtaskInput.scss';

const SubtaskInput = ({ subtask, onChange, onRemove, index, errors }) => {
	return (
		<div className='kanban__add-task_subtask-input'>
			<input
				className={
					subtask.title
						? 'kanban__add-task_subtask-input_disabled'
						: errors.map(error => error.param).includes('subtask')
						? 'kanban__add-task_input-error'
						: ''
				}
				disabled={subtask.title}
				type='text'
				placeholder='e.g. Make Coffee'
				value={subtask.title}
				onChange={onChange}
				name={subtask.title}
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
