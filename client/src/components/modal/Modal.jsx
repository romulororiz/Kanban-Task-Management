import '@styles/scss/boards/Modal.scss';

const Modal = ({ title, content, onSubmit, mode, onSubmitText }) => {
	return (
		<div className='kanban__modal-overlay'>
			<div className='kanban__modal-container'>
				<div className='kanban__modal-title'>
					<h3>{title}</h3>
				</div>
				<div className='kanban__modal-content'>{content}</div>
				<div className='kanban__modal-footer'>
					<button className='kanban__modal-button' onClick={onSubmit}>
						{onSubmitText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
