import { useRef } from 'react';
import useOnClickOutside from '@hooks/useOnClickOutside';
import '@styles/scss/modal/Modal.scss';

const Modal = ({
	title,
	content,
	showModal,
	setShowModal,
	setModalMode,
	modalMode,
}) => {
	// reference to the dropdown menu
	const modalRef = useRef();

	// initialize useOnClickOutside hook
	useOnClickOutside(modalRef, () => {
		setShowModal(false);

		switch (modalMode) {
			case 'updateColumn':
				setModalMode('addColumn');
				break;
			case 'updateBoard':
				setModalMode('addBoard');
				break;
			case 'updateTask':
				setModalMode('addTask');
				break;
			case 'viewTask':
				setModalMode('addTask');
			default:
				break;
		}
	});

	return (
		<div className='kanban__modal-overlay'>
			<div ref={modalRef} className='kanban__modal-container'>
				<div className='kanban__modal-header'>
					<h3 className='kanban__modal-title'>{title}</h3>
				</div>
				<div className='kanban__modal-content'>{content}</div>
			</div>
		</div>
	);
};

export default Modal;
