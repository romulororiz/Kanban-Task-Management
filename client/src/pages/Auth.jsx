import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import '@styles/scss/auth/Auth.scss';

const Auth = () => {
	const [form, setForm] = useState('login');

	const location = useLocation();

	const handleBgSmall = () => {
		if (location.pathname.startsWith('/auth')) {
			return 'kanban__auth-body';
		} else {
			return '';
		}
	};

	useEffect(() => {
		if (location.pathname === '/auth/login') {
			setForm('login');
		} else if (location.pathname === '/auth/register') {
			setForm('register');
		}
	}, [location]);

	return (
		<div className={`kanban__auth ${handleBgSmall()}`}>
			<AuthCard form={form} setForm={setForm} />
		</div>
	);
};

export default Auth;
