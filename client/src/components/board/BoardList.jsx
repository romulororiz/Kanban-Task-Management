import { useSelector } from 'react-redux';

const BoardList = () => {
	const { user } = useSelector(state => state.auth);

	console.log(user);
	return (
		<div>
			<h1>BoardList</h1>
		</div>
	);
};

export default BoardList;
