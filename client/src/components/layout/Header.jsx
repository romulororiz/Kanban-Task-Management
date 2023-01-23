import Ellipsis from '@assets/dashboard/icon-vertical-ellipsis.svg';
import Add from '@assets/dashboard/icon-add-task-mobile.svg';
import LogoDark from '@assets/dashboard/logo-dark.svg';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { useDispatch } from 'react-redux';
import { logout } from '@features/auth/authSlice';
import { useRef, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import '@styles/scss/layout/Header.scss';

const Header = ({ showSidebar }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	// reference to the dropdown menu
	const dropdownRef = useRef();

	// initialize useOnClickOutside hook
	useOnClickOutside(dropdownRef, () => setShowDropdown(false));

	// initialize dispatch
	const dispatch = useDispatch();

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
						<img
							src={Ellipsis}
							alt='menu icon'
							onClick={() => setShowDropdown(!showDropdown)}
						/>
						<div
							ref={dropdownRef}
							className={`${
								showDropdown
									? 'kanban__header-board_dropdown'
									: 'kanban__header-board_dropdown-hide'
							}`}
						>
							<ul>
								<li>
									<FaRegEdit />
									Edit Board
								</li>
								<li>
									<FaRegTrashAlt />
									Remove Board
								</li>
								<li onClick={() => dispatch(logout())}>
									<CgLogOut />
									Logout
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
