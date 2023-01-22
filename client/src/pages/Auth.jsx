import { useEffect, useState } from 'react';
import '@styles/scss/auth/Auth.scss';
import { useLocation } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';

const Auth = () => {
	const [form, setForm] = useState('login');

	const location = useLocation();

	// render different forms based on the path
	useEffect(() => {
		if (location.pathname === '/auth/login') {
			setForm('login');
		} else if (location.pathname === '/auth/register') {
			setForm('register');
		}
	}, [location]);

	return (
		<div className='kanban__auth'>
			<AuthCard form={form} setForm={setForm} />
		</div>
	);
};

export default Auth;
