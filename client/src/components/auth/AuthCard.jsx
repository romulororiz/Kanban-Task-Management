import logo from '@assets/auth/logo-light.svg';
import '@styles/scss/auth/AuthCard.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthCard = ({ form, setForm }) => {
	return (
		<div className='kanban__auth-card'>
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
						<LoginForm setForm={setForm} />
					) : (
						<RegisterForm setForm={setForm} />
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthCard;
