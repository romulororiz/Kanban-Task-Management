import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@features/authSlice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Error from './Error';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '@styles/scss/auth/LoginForm.scss';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState([]);
	const [passwordShown, setPasswordShown] = useState(false);

	// extract data from formData
	const { email, password } = formData;

	// extract errors from state
	const { errors: loginErrors, isError } = useSelector(state => state.auth);

	// initialize dispatch
	const dispatch = useDispatch();

	// set errors to loginErrors if there are any
	useEffect(() => {
		if (loginErrors) {
			setErrors(loginErrors);
		}

		if (errors) {
			setTimeout(() => {
				setErrors([]);
			}, 5000);
		}
	}, [loginErrors]);

	// check if password is shown
	useEffect(() => {
		if (passwordShown) {
			document.getElementById('password').type = 'text';
		} else {
			document.getElementById('password').type = 'password';
		}
	}, [passwordShown]);

	// onChange handler for form inputs
	const onChange = e => {
		const { name, value } = e.target;

		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	// onSubmit handler for form
	const onSubmit = e => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		if (!errors.length) {
			dispatch(login(userData));
		}
	};

	// handle password visibility
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown => !passwordShown);
	};

	console.log(errors);

	return (
		<div className='kanban__auth-login'>
			<div className='kanban__auth-login_heading'>
				<h1 className='kanban__auth-login_title'>Login</h1>
				<p className='kanban__auth-login_lead'>
					Please provide your credentials to login
				</p>
			</div>

			<form className='kanban__auth-login_form' onSubmit={onSubmit}>
				<div className='kanban__auth-login_form-inputs'>
					<div className='kanban__auth-login_form-input'>
						<label htmlFor='email'>Email</label>
						<input
							className={
								errors.length && errors.some(error => error.param === 'email')
									? 'kanban__auth-login_form-input_error'
									: ''
							}
							type='email'
							name='email'
							placeholder='e.g Stephen King'
							onChange={onChange}
						/>
						<Error errors={errors} errorParam='email' />
					</div>

					<div className='kanban__auth-login_form-input'>
						<label htmlFor='password'>Password</label>
						<div className='kanban__auth-login_form-input_password-wrapper'>
							<input
								className={
									errors.length &&
									errors.some(error => error.param === 'password')
										? 'kanban__auth-login_form-input_error'
										: ''
								}
								type='password'
								name='password'
								id='password'
								placeholder='e.g stephenking@lorem.com'
								onChange={onChange}
							/>
							{passwordShown ? (
								<FaEyeSlash
									className='kanban__auth-login_form-input_password-icon'
									onClick={togglePasswordVisiblity}
								/>
							) : (
								<FaEye
									className='kanban__auth-login_form-input_password-icon'
									onClick={togglePasswordVisiblity}
								/>
							)}
						</div>
						<Error errors={errors} errorParam='password' />
					</div>
				</div>
				<div className='kanban__auth-login_form-btn kanban__auth-login_form-register'>
					<p>
						Don't have an account? <Link to='/auth/register'>Register</Link>
					</p>
					<button type='submit'>Login</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
