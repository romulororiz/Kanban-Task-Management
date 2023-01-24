import DarkTheme from '@assets/dashboard/icon-dark-theme.svg';
import LightTheme from '@assets/dashboard/icon-light-theme.svg';
import '@styles/scss/layout/ToggleSwitch.scss';

const ToggleSwitch = () => {
	return (
		<>
			<img src={LightTheme} alt='light theme' />
			<label className='kanban__sidebar-switch'>
				<input type='checkbox' />
				<span className='slider round'></span>
			</label>
			<img src={DarkTheme} alt='dark theme' />
		</>
	);
};
export default ToggleSwitch;
