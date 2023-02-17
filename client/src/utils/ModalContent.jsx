import AddBoard from '@components/modal/content/addBoard/AddBoard';
import AddColumn from '@components/modal/content/addColumn/AddColumn';
import AddTask from '@components/modal/content/addTask/AddTask';

const ModalContent = (
	modalMode,
	setShowModal,
	setModalMode,
	board,
	theme,
	column
) => {
	switch (modalMode) {
		case 'addBoard':
			return (
				<AddBoard
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
				/>
			);
		case 'updateBoard':
			return (
				<AddBoard
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
					board={board}
				/>
			);
		case 'addColumn':
			return (
				<AddColumn
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
					board={board}
					column={column}
				/>
			);
		case 'updateColumn':
			return (
				<AddColumn
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
					board={board}
					column={column}
				/>
			);
		case 'addTask':
			return (
				<AddTask
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
					theme={theme}
				/>
			);
		case 'viewTask':
			return (
				<AddTask
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
					theme={theme}
					column={column}
				/>
			);
		case 'updateTask':
			return (
				<AddTask
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
					theme={theme}
					column={column}
				/>
			);
		default:
			break;
	}
};

export default ModalContent;
