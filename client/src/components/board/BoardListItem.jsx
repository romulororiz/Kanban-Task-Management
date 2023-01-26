import BoardSvg from '@assets/dashboard/icon-board.svg';
import Add from '@assets/dashboard/icon-add-task-mobile.svg';
import '@styles/scss/boards/BoardListItem.scss';

const BoardListItem = ({ board, isActive, text, onClick }) => {
	return (
		<div
			className={`kanban__board-item ${!board && 'kanban__board-item_create'} ${
				isActive && 'kanban__board-item-active no-hover'
			}`}
		>
			<div className='kanban__board-item_icon'>
				<img src={BoardSvg} alt='board icon' />
			</div>
			<span
				className={`kanban__board-item_text ${
					!board && 'kanban__board-item_text_create'
				}`}
			>
				{!board && <img src={Add} alt='add board' />}
				<span onClick={board ? () => onClick(board._id) : null}>
					{board ? board.name : text}
				</span>
			</span>
		</div>
	);
};
export default BoardListItem;
