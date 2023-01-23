import Ellipsis from '@assets/dashboard/icon-vertical-ellipsis.svg';
import Add from '@assets/dashboard/icon-add-task-mobile.svg';
import LogoDark from '@assets/dashboard/logo-dark.svg';
import '@styles/scss/layout/Header.scss';

const Header = ({ showSidebar }) => {
	return (
		<div className='kanban__header'>
			<div
				className={`kanban__header-container ${
					!showSidebar && 'kanban__header-container_no-sidebar'
				}`}
			>
				<div
					className={`kanban__header-logo ${
						!showSidebar && 'kanban__header-logo_no-sidebar'
					}`}
				>
					<img src={LogoDark} alt='logo dark' />
				</div>
				<div className='kanban__header-board_name'>Board Name</div>
				<div className='kanban__header-board_actions'>
					<button>
						<img src={Add} alt='add task' />
						Add New Task
					</button>
					<div className='kanban__header-board_actions-menu'>
						<img src={Ellipsis} alt='menu icon' />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
