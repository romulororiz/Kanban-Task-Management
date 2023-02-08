import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateTask } from '@features/tasks/taskSlice';
import { useThemeContext } from '@hooks/useThemeContext';
import '@styles/scss/modal/addTask/SubtaskItem.scss';

const SubtaskItem = ({ subtask, task }) => {
	const [isChecked, setIsChecked] = useState(false);

	// get theme from context
	const {
		state: { theme },
	} = useThemeContext();

	// get task id from url
	const { taskId } = useParams();

	// initialize dispatch
	const dispatch = useDispatch();

	// handle subtask status change
	const onChangeHandler = e => {
		setIsChecked(e.target.checked);

		const updatedSubtasks = task.subtasks.map(subtaskMap => {
			if (subtaskMap._id === e.target.value) {
				return {
					...subtaskMap,
					isCompleted: e.target.checked,
				};
			} else {
				return subtaskMap;
			}
		});

		const taskData = {
			subtasks: updatedSubtasks,
		};

		dispatch(updateTask({ taskId, taskData }));
	};

	// check if subtask is completed and if so set isChecked to true
	useEffect(() => {
		if (subtask.isCompleted) {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [subtask.isCompleted]);

	return (
		<div
			className={`${
				theme === 'dark'
					? 'kanban__add-task_subtask-item-dark'
					: 'kanban__add-task_subtask-item'
			}`}
		>
			<input
				type='checkbox'
				value={subtask._id}
				onChange={onChangeHandler}
				checked={isChecked}
			/>
			<p className={isChecked ? 'kanban__add-task_subtask-item_checked' : ''}>
				{subtask.title}
			</p>
		</div>
	);
};

export default SubtaskItem;
