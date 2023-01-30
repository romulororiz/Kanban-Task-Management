import { useRef } from 'react';
import useOnClickOutside from '@hooks/useOnClickOutside';
import '@styles/scss/modal/Modal.scss';

const Modal = ({ title, content, setShowModal, setModalMode }) => {
	// reference to the dropdown menu
	const modalRef = useRef();
	// initialize useOnClickOutside hook
	useOnClickOutside(modalRef, () => {
		setShowModal(false);
		setModalMode('addBoard');
	});

	return (
		<div className='kanban__modal-overlay'>
			<div className='kanban__modal-container' ref={modalRef}>
				<div className='kanban__modal-title'>
					<h3>{title}</h3>
				</div>
				<div className='kanban__modal-content'>{content}</div>
			</div>
		</div>
	);
};

export default Modal;
