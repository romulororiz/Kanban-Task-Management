import logo from '@assets/auth/logo-light.svg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ToggleSwtich from '@components/layout/ToggleSwitch';
import { useThemeContext } from '@hooks/useThemeContext';
import '@styles/scss/auth/AuthCard.scss';

const AuthCard = ({ form, setForm }) => {
	const {
		state: { theme },
	} = useThemeContext();

	return (
		<div
			className={`${
				theme === 'dark' ? 'kanban__auth-card_dark' : 'kanban__auth-card'
			}`}
		>
			<div className='kanban__auth-toggle'>
				<ToggleSwtich />
			</div>
			<div className='kanban__auth-card__left-side'>
				<div className='kanban__auth-card__left-side_container'>
					<div className='kanban__auth-card__left-side_container-logo'>
						<img src={logo} alt='logo' />
					</div>
					<div className='kanban__auth-card__left-side_container-text'>
						<h3>
							Streamline your work and boost productivity with our kanban task
							management app
						</h3>
					</div>
				</div>
			</div>
			<div className='kanban__auth-card__right-side'>
				<div className='kanban__auth-card__right-side_container'>
					{form === 'login' ? (
						<LoginForm setForm={setForm} theme={theme} />
					) : (
						<RegisterForm setForm={setForm} theme={theme} />
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthCard;
