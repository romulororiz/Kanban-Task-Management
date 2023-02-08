import '@styles/scss/Error.scss';

const Error = ({ errors, errorParam, error }) => {
	if (!errors || !errors.length) {
		return null;
	}

	return (
		<div className='error-container'>
			{errors &&
				errors.map(
					({ param, msg }, index) =>
						param === errorParam && (
							<div
								key={index}
								className={`kanban__input-error ${
									errorParam === 'subtask' ||
									errorParam === 'title' ||
									errorParam === 'description' ||
									errorParam === 'status'
										? 'kanban__input-error-task'
										: ''
								}`}
							>
								{msg}
							</div>
						)
				)}
			{error && !errors && <div className='kanban__input-error'>{error}</div>}
		</div>
	);
};

export default Error;
