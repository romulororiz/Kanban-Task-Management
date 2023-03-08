import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthCard from '@components/auth/AuthCard';
import { useThemeContext } from '@hooks/useThemeContext';
import '@styles/scss/auth/Auth.scss';

const Auth = () => {
	const [form, setForm] = useState('login');

	const {
		state: { theme },
	} = useThemeContext();

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
			<p className={theme === 'dark' ? 'copyright-dark' : 'copyright'}>
				&copy; Romulo Roriz <span>2023</span>
			</p>
		</div>
	);
};

export default Auth;
