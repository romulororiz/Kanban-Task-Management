import { useRef } from 'react';
import { useSpring, animated, useTransition } from 'react-spring';
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
	const springs = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { duration: 300 },
	});

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
			default:
				break;
		}
	});

	return (
		<div className='kanban__modal-overlay'>
			<animated.div ref={modalRef} className='kanban__modal-container'>
				<div className='kanban__modal-header'>
					<h3 className='kanban__modal-title'>{title}</h3>
				</div>
				<div className='kanban__modal-content'>{content}</div>
			</animated.div>
		</div>
	);
};

export default Modal;
