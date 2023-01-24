import { useSelector } from 'react-redux';
import Column from '@components/board/Column';
import '@styles/scss/boards/Dashboard.scss';
import { useEffect } from 'react';

const Dashboard = () => {
	// const { columns } = useSelector(state => state.column);

	// get columns for this board
	// useEffect(() => {
	// 	dispatch(getColumns(boardId));
	// }, [dispatch, boardId]);

	return (
		<div className='kanban__dashboard-board'>
			<Column name='Todo' />
			<Column name='Todo' />
			<Column name='Todo' />
			<Column name='Todo' />
			<Column name='Todo' />
			<Column name='Todo' />
			<Column name='Todo' />
			<Column name='Todo' />
		</div>
	);
};

export default Dashboard;
