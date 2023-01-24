import { useDispatch, useSelector } from 'react-redux';
import Column from '@components/board/Column';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardColumns } from '@features/columns/columnSlice';
import Add from '@assets/dashboard/icon-add-task-mobile.svg';
import '@styles/scss/boards/Dashboard.scss';

const Dashboard = () => {
	const { columns } = useSelector(state => state.column);

	// initialize dispatch
	const dispatch = useDispatch();

	// get id from params
	const { id: boardId } = useParams();

	// get columns for the board that's being viewed
	useEffect(() => {
		dispatch(getBoardColumns(boardId));
	}, [dispatch, boardId]);

	return columns.length > 0 ? (
		<div className='kanban__dashboard-board'>
			{columns.length &&
				columns.map(column => <Column key={column._id} column={column} />)}
			<div className='kanban__dashboard-add_column'>
				<div className='kanban__dashboard-add_column-content'>
					<img src={Add} alt='add column' />
					<p>New Column</p>
				</div>
			</div>
		</div>
	) : (
		<div className='kanban__dashboard-empty'>
			This board is empty. Add a column to get started.
			<div className='kanban__dashboard-empty-button'>
				<img src={Add} alt='add column' />
				<p>New Column</p>
			</div>
		</div>
	);
};

export default Dashboard;
