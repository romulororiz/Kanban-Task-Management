import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '@features/boards/boardSlice';

const BoardList = () => {
	// get boards from store
	const { boards } = useSelector(state => state.board);

	console.log(boards);

	// initialize dispatch
	const dispatch = useDispatch();

	// get boards on component render
	useEffect(() => {
		dispatch(getBoards());
	}, [dispatch]);

	return (
		<div>
			<h1>BoardList</h1>
		</div>
	);
};

export default BoardList;
