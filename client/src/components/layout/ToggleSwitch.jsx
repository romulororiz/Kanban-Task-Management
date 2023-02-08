import { MdOutlineLightMode } from 'react-icons/md';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { useThemeContext } from '@hooks/useThemeContext';
import '@styles/scss/layout/ToggleSwitch.scss';
import { useState } from 'react';

const ToggleSwitch = () => {
	const [checked, setChecked] = useState(false);

	// get state and dispatch from theme context
	const {
		state: { theme },
		dispatch,
	} = useThemeContext();

	// handle theme change
	const handleThemeChange = () => {
		if (theme === 'light') {
			dispatch({ type: 'SET_THEME', payload: 'dark' });
		} else {
			dispatch({ type: 'SET_THEME', payload: 'light' });
		}
	};

	return (
		<div className='kanban__sidebar-switch_container'>
			<MdOutlineLightMode />
			<label className='kanban__sidebar-switch'>
				<input
					type='checkbox'
					onChange={handleThemeChange}
					checked={theme === 'dark' ? true : false}
				/>
				<span className='slider round'></span>
			</label>
			<BsFillMoonStarsFill />
		</div>
	);
};
export default ToggleSwitch;
