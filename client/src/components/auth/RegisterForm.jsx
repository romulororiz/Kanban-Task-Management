import Error from '@components/Error';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, clearErrors } from '@features/auth/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useCallback } from 'react';
import '@styles/scss/auth/RegisterForm.scss';

const RegisterForm = ({ theme }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState([]);
	const [passwordShown, setPasswordShown] = useState(false);

	// extract data from formData
	const { firstName, lastName, email, password, confirmPassword } = formData;

	// extract errors from state
	const { errors: registrationErrors } = useSelector(state => state.auth);

	// initialize dispatch
	const dispatch = useDispatch();

	// set errors to registrationErrors if there are any
	useEffect(() => {
		if (registrationErrors) {
			setErrors(registrationErrors);
		}

		if (errors) {
			setTimeout(() => {
				setErrors([]);
			}, 3000);
		}
	}, [registrationErrors]);

	// onChange handler for form inputs
	const onChange = useCallback(e => {
		const { name, value } = e.target;

		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	// onSubmit handler for form
	const onSubmit = useCallback(
		e => {
			e.preventDefault();

			const userData = {
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
			};

			// dispatch register action if no errors
			if (!errors.length) {
				dispatch(register(userData));
				dispatch(clearErrors());
			}
		},
		[errors, firstName, lastName, email, password, confirmPassword, dispatch]
	);

	// check if password is shown
	useEffect(() => {
		if (passwordShown) {
			document.getElementById('password').type = 'text';
		} else {
			document.getElementById('password').type = 'password';
		}
	}, [passwordShown]);

	// toggle password visibility
	const togglePasswordVisibility = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	return (
		<div
			className={`${
				theme === 'dark'
					? 'kanban__auth-register_dark'
					: 'kanban__auth-register'
			}`}
		>
			<div className='kanban__auth-register_heading'>
				<h1 className='kanban__auth-register_title'>Register</h1>
				<p className='kanban__auth-register_lead'>
					Please provide your personal info to register
				</p>
			</div>

			<form className='kanban__auth-register_form' onSubmit={onSubmit}>
				<div className='kanban__auth-register_form-inputs_wrapper'>
					<div className='kanban__auth-register_form-input'>
						<label htmlFor='firstName'>First Name</label>
						<input
							className={
								errors.length &&
								errors.some(error => error.param === 'firstName')
									? 'kanban__auth-register_form-input_error'
									: ''
							}
							type='text'
							name='firstName'
							placeholder='e.g Stephen'
							onChange={onChange}
						/>
						<Error errors={errors} errorParam='firstName' />
					</div>
					<div className='kanban__auth-register_form-input'>
						<label htmlFor='lastName'>Last Name</label>
						<input
							className={
								errors.length &&
								errors.some(error => error.param === 'lastName')
									? 'kanban__auth-register_form-input_error'
									: ''
							}
							type='text'
							name='lastName'
							placeholder='e.g King'
							onChange={onChange}
						/>
						<Error errors={errors} errorParam='lastName' />
					</div>
				</div>

				<div className='kanban__auth-register_form-input'>
					<label htmlFor='email'>Email</label>
					<input
						className={
							errors.length && errors.some(error => error.param === 'email')
								? 'kanban__auth-register_form-input_error'
								: ''
						}
						type='email'
						name='email'
						placeholder='e.g stephenking@lorem.com'
						onChange={onChange}
					/>
					<Error errors={errors} errorParam='email' />
				</div>

				<div className='kanban__auth-register_form-inputs_wrapper'>
					<div className='kanban__auth-register_form-input'>
						<label htmlFor='password'>Password</label>
						<div className='kanban__auth-register_form-input_password-wrapper'>
							<input
								className={
									errors.length &&
									errors.some(error => error.param === 'password')
										? 'kanban__auth-register_form-input_error'
										: ''
								}
								type='password'
								name='password'
								id='password'
								placeholder='Your password'
								onChange={onChange}
							/>
							{passwordShown ? (
								<FaEye
									className='kanban__auth-register_form-input_password-icon'
									onClick={togglePasswordVisibility}
								/>
							) : (
								<FaEyeSlash
									className='kanban__auth-register_form-input_password-icon'
									onClick={togglePasswordVisibility}
								/>
							)}
						</div>
						<Error errors={errors} errorParam='password' />
					</div>
					<div className='kanban__auth-register_form-input'>
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<input
							className={
								errors.length &&
								errors.some(error => error.param === 'confirmPassword')
									? 'kanban__auth-register_form-input_error'
									: ''
							}
							type='password'
							name='confirmPassword'
							placeholder='Confirm your password'
							onChange={onChange}
						/>
						<Error errors={errors} errorParam='confirmPassword' />
					</div>
				</div>
				<div className='kanban__auth-register_form-btn kanban__auth-register_form-register'>
					<p>
						Already have an account?{' '}
						<Link to='/auth/login' onClick={() => dispatch(clearErrors())}>
							Sign in
						</Link>
					</p>
					<button type='submit'>register</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
