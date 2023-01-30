import ShowSidebarSvg from '@assets/dashboard/icon-show-sidebar.svg';
import { FaEye } from 'react-icons/fa';
import '@styles/scss/layout/ShowSidebar.scss';

const ShowSidebar = ({ showSidebar, setShowSidebar }) => {
	return (
		!showSidebar && (
			<div
				className='kanban__show-sidebar'
				onClick={() => setShowSidebar(true)}
			>
				<FaEye />
			</div>
		)
	);
};
export default ShowSidebar;
