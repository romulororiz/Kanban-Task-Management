import '@styles/scss/auth/Error.scss';

const Error = ({ errors, errorParam }) => {
	if (!errors || !errors.length) {
		return null;
	}

	return (
		<div className='error-container'>
			{errors.map(
				({ param, msg }, index) =>
					param === errorParam && (
						<div key={index} className='kanban__auth-login-error'>
							{msg}
						</div>
					)
			)}
		</div>
	);
};

export default Error;
