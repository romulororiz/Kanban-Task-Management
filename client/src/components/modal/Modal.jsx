import { useRef } from 'react';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { useNavigate } from 'react-router-dom';
import '@styles/scss/modal/Modal.scss';

const Modal = ({
	title,
	content,
	showModal,
	setShowModal,
	setModalMode,
	modalMode,
}) => {
	// initialize navigate
	const navigate = useNavigate();

	// reference to the modal container
	const modalRef = useRef();

	// initialize useOnClickOutside hook
	useOnClickOutside(modalRef, () => {
		setShowModal(false);

		if (
			modalMode === 'viewTask' ||
			modalMode === 'updateTask' ||
			modalMode === 'updateColumn'
		) {
			navigate(-1);
		}

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
