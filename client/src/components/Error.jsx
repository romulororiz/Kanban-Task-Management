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
							<div key={index} className='kanban__input-error'>
								{msg}
							</div>
						)
				)}
			{error && !errors && <div className='kanban__input-error'>{error}</div>}
		</div>
	);
};

export default Error;
