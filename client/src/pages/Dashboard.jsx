import { useDispatch, useSelector } from 'react-redux';
import Column from '@components/board/Column';
import Modal from '@components/modal/Modal';
import AddColumn from '@components/modal/content/addColumn/AddColumn';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardColumns } from '@features/columns/columnSlice';
import Spinner from '@components/Spinner';
import { TiPlus } from 'react-icons/ti';
import useWindowSize from '@hooks/useWindowSize';
import '@styles/scss/boards/Dashboard.scss';

const Dashboard = ({ theme }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState('addColumn');

	console.log(theme)

	// get window width
	const windowSize = useWindowSize();

	// define isMobile variable
	const isMobile = windowSize.width < 550;

	// get columns from store
	const { columns, isLoading } = useSelector(state => state.column);

	// get boards from store
	const { boards } = useSelector(state => state.board);

	// initialize dispatch
	const dispatch = useDispatch();

	// get id from params
	const { id: boardId } = useParams();

	// get columns for the board that's being viewed
	useEffect(() => {
		dispatch(getBoardColumns(boardId));
	}, [dispatch, boardId]);

	// Handle open modal on empty board
	const handleAddColumn = () => {
		setShowModal(true);
		setModalMode('addColumn');
	};

	// handle loading
	if (isLoading)
		return (
			<div className='kanban__dashboard-loading'>
				<Spinner />
			</div>
		);

	return (
		<div className='kanban__dashboard'>
			{showModal && (
				<Modal
					title={modalMode === 'addColumn' ? 'Add Column' : 'Update Column'}
					setShowModal={setShowModal}
					showModal={showModal}
					setModalMode={setModalMode}
					content={
						<AddColumn
							showModal={showModal}
							setShowModal={setShowModal}
							setModalMode={setModalMode}
						/>
					}
				/>
			)}
			{boards.length <= 0 ? (
				<p className='kanban__dashboard-empty_boards'>
					You have no boards. Create a board to get started.
				</p>
			) : columns.length > 0 ? (
				<div className='kanban__dashboard-board'>
					{columns.map(column => (
						<Column key={column._id} column={column} />
					))}
					<div className='kanban__dashboard-add_column'>
						<div
							className='kanban__dashboard-add_column-content'
							onClick={() => setShowModal(true)}
						>
							<TiPlus />
							<p>New Column</p>
						</div>
					</div>
				</div>
			) : (
				<div className='kanban__dashboard-empty'>
					<p>This board is empty. Add a column to get started.</p>
					<div
						className='kanban__dashboard-empty-button'
						onClick={handleAddColumn}
					>
						<TiPlus />
						<p>New Column</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
