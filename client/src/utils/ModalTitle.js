export const ModalTitle = modalMode => {
	switch (modalMode) {
		case 'addBoard':
			return 'Add Board';
		case 'updateBoard':
			return 'Update Board';
		case 'addColumn':
			return 'Add Column';
		case 'updateColumn':
			return 'Update Column';
		case 'addTask':
			return 'Add Task';
		default:
	}
};
