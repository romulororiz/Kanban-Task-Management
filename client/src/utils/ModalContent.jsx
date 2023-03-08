import AddBoard from '@components/modal/content/addBoard/AddBoard';
import AddColumn from '@components/modal/content/addColumn/AddColumn';
import AddTask from '@components/modal/content/addTask/AddTask';

const ModalContent = (modalMode, setShowModal, setModalMode, board, column) => {
	const commonProps = { setShowModal, modalMode, setModalMode };

	switch (modalMode) {
		case 'addBoard':
			return <AddBoard {...commonProps} />;
		case 'updateBoard':
			return <AddBoard {...commonProps} board={board} />;
		case 'addColumn':
			return <AddColumn {...commonProps} board={board} column={column} />;
		case 'updateColumn':
			return <AddColumn {...commonProps} board={board} column={column} />;
		case 'addTask':
			return <AddTask {...commonProps} />;
		case 'viewTask':
			return <AddTask {...commonProps} column={column} />;
		case 'updateTask':
			return <AddTask {...commonProps} column={column} />;
		default:
			break;
	}
};

export default ModalContent;
