import ShowSidebarSvg from '@assets/dashboard/icon-show-sidebar.svg';
import '@styles/scss/layout/ShowSidebar.scss';

const ShowSidebar = ({ showSidebar, setShowSidebar }) => {
	return (
		!showSidebar && (
			<div
				className='kanban__show-sidebar'
				onClick={() => setShowSidebar(true)}
			>
				<img src={ShowSidebarSvg} alt='show-sidebar' />
			</div>
		)
	);
};
export default ShowSidebar;
