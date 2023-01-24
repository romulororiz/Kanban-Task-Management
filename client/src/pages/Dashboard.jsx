import { useDispatch, useSelector } from 'react-redux';
import Column from '@components/board/Column';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardColumns } from '@features/columns/columnSlice';
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

	return (
		<div className='kanban__dashboard-board'>
			{columns.length &&
				columns.map(column => <Column key={column._id} column={column} />)}
		</div>
	);
};

export default Dashboard;
