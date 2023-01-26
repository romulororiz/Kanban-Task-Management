import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import '@styles/scss/auth/Auth.scss';

const Auth = () => {
	const [form, setForm] = useState('login');

	const location = useLocation();

	useEffect(() => {
		// render different forms based on the path
		if (location.pathname === '/auth/login') {
			setForm('login');
		} else if (location.pathname === '/auth/register') {
			setForm('register');
		}

		// add class to body if users is on auth route
		if (location.pathname.startsWith('/auth')) {
			document.body.classList.add('kanban__auth-body');
		}

		// remove class from body if users is not on auth route
		return () => {
			document.body.classList.remove('kanban__auth-body');
		};
	}, [location]);

	return (
		<div className='kanban__auth'>
			<AuthCard form={form} setForm={setForm} />
		</div>
	);
};

export default Auth;
