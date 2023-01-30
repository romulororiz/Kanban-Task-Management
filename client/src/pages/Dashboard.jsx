import { useDispatch, useSelector } from 'react-redux';
import Column from '@components/board/Column';
import Modal from '@components/modal/Modal';
import AddColumn from '@components/modal/content/AddColumn/AddColumn';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardColumns } from '@features/columns/columnSlice';
import Add from '@assets/dashboard/icon-add-task-mobile.svg';
import Spinner from '@components/Spinner';
import '@styles/scss/boards/Dashboard.scss';
import { TiPlus } from 'react-icons/ti';

const Dashboard = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState('addColumn');

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
		<>
			{showModal && (
				<Modal
					title={modalMode === 'addColumn' ? 'Add Column' : 'Update Column'}
					setShowModal={setShowModal}
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
				<div className='kanban__dashboard-empty_boards'>
					You have no boards. Create a board to get started.
				</div>
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
					This board is empty. Add a column to get started.
					<div
						className='kanban__dashboard-empty-button'
						onClick={handleAddColumn}
					>
						<TiPlus />
						<p>New Column</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
