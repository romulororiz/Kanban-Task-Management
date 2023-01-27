import { FaTimes } from 'react-icons/fa';
import '@styles/scss/modal/addBoard/ColumnInput.scss';

const ColumnInput = ({ column, onChange, onRemove, index }) => {
	return (
		<div className='kanban__add-board_column-input'>
			<input
				type='text'
				placeholder='Column Name'
				value={column}
				name='columnName'
				onChange={onChange}
			/>
			{onRemove && (
				<FaTimes
					className='kanban__add-board_remove-icon'
					onClick={() => onRemove(index)}
				/>
			)}
		</div>
	);
};

export default ColumnInput;
