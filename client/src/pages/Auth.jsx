import { useState } from 'react';
import '@styles/scss/auth/Auth.scss';
import { useLocation } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';

const Auth = () => {
	const [loginForm, setLoginForm] = useState(true);
	const [registerForm, setRegisterForm] = useState(false);

	const location = useLocation();

	return (
		<div className='kanban__auth'>
			<AuthCard
				form={location === '/auth/login' ? loginForm : registerForm}
				setLoginForm={setLoginForm}
				setRegisterForm={setRegisterForm}
			/>
		</div>
	);
};

export default Auth;
