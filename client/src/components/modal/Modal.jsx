import { useRef } from 'react';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '@features/boards/boardSlice';
import '@styles/scss/modal/Modal.scss';

const Modal = ({
	title,
	content,
	showModal,
	setShowModal,
	setModalMode,
	modalMode,
	theme,
}) => {
	// initialize navigate and dispatch
	const dispatch = useDispatch();
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

		if (modalMode === 'updateBoard') {
			dispatch(getBoards());
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
