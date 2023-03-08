import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from '@hooks/useOnClickOutside';
import '@styles/scss/modal/Modal.scss';

const Modal = ({ title, content, setShowModal, modalMode, theme }) => {
	// initialize navigate and dispatch
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
	});

	return (
		<div className='kanban__modal-overlay'>
			<div
				ref={modalRef}
				className={`${
					theme === 'dark'
						? 'kanban__modal-container-dark'
						: 'kanban__modal-container'
				}`}
			>
				<div className='kanban__modal-header'>
					<h3 className='kanban__modal-title'>{title}</h3>
				</div>
				<div className='kanban__modal-content'>{content}</div>
			</div>
		</div>
	);
};

export default Modal;
