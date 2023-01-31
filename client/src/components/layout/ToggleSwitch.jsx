import { MdOutlineLightMode } from 'react-icons/md';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import '@styles/scss/layout/ToggleSwitch.scss';

const ToggleSwitch = () => {
	return (
		<div className='kanban__sidebar-switch_container'>
			<MdOutlineLightMode />
			<label className='kanban__sidebar-switch'>
				<input type='checkbox' />
				<span className='slider round'></span>
			</label>
			<BsFillMoonStarsFill />
		</div>
	);
};
export default ToggleSwitch;
