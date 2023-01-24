import { useDispatch, useSelector } from 'react-redux';
import Column from '@components/board/Column';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardColumns } from '@features/columns/columnSlice';
import { getBoards } from '@features/boards/boardSlice';
import Add from '@assets/dashboard/icon-add-task-mobile.svg';
import '@styles/scss/boards/Dashboard.scss';
import Spinner from '@components/Spinner';

const Dashboard = () => {
	// get columns from store
	const { columns, isLoading, isError } = useSelector(state => state.column);

	// get boards from store
	const { boards } = useSelector(state => state.board);

	console.log(boards);

	// initialize dispatch
	const dispatch = useDispatch();

	// get id from params
	const { id: boardId } = useParams();

	// get columns for the board that's being viewed
	useEffect(() => {
		dispatch(getBoards());
		dispatch(getBoardColumns(boardId));
	}, [dispatch, boardId]);

	// handle loading
	if (isLoading)
		return (
			<div className='kanban__dashboard-loading'>
				<Spinner />
			</div>
		);

	return boards.length <= 0 ? (
		<div className='kanban__dashboard-empty_boards'>
			You have no boards. Create a board to get started.
		</div>
	) : columns.length > 0 ? (
		<div className='kanban__dashboard-board'>
			{columns.map(column => (
				<Column key={column._id} column={column} />
			))}
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
