import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@features/authSlice';
import '@styles/scss/auth/LoginForm.scss';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const dispatch = useDispatch();

	const onChange = e => {
		const { name, value } = e.target;

		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const onSubmit = e => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	return (
		<form className='kanban__auth-login_form' onSubmit={onSubmit}>
			<div className='kanban__auth-login_form-input'>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' onChange={onChange} />
			</div>
			<div className='kanban__auth-login_form-input'>
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' onChange={onChange} />
			</div>
			<div className='kanban__auth-login_form-input'>
				<button type='submit'>Login</button>
			</div>
		</form>
	);
};

export default LoginForm;
