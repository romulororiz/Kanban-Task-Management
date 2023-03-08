import { useEffect, useRef, useState } from 'react';
import Ellipsis from '@assets/dashboard/icon-vertical-ellipsis.svg';
import LogoDark from '@assets/dashboard/logo-dark.svg';
import LogoLight from '@assets/dashboard/logo-light.svg';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { logout } from '@features/auth/authSlice';
import { FaAt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { CgLogOut } from 'react-icons/cg';
import { TiPlus } from 'react-icons/ti';
import useWindowSize from '@hooks/useWindowSize';
import '@styles/scss/layout/Header.scss';

const Header = ({
	setShowSidebar,
	showSidebar,
	user,
	boards,
	board,
	columns,
	theme,
	setShowModal,
	setModalMode,
}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	// get window width
	const windowSize = useWindowSize();

	// define isMobile variable
	const isTablet = windowSize.width < 768;
	const isMobile = windowSize.width < 550;

	// initialize dispatch
	const dispatch = useDispatch();

	// reference to the dropdown menu
	const dropdownRef = useRef();

	// initialize useOnClickOutside hook
	useOnClickOutside(dropdownRef, () => setShowDropdown(false));

	// check for board and check if board has columns
	useEffect(() => {
		if (!boards.length) {
			setIsDisabled(true);
		} else if (!columns.length) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [boards, columns]);

	return (
		<div
			className={`${
				theme === 'dark' ? 'kanban__header-dark' : 'kanban__header'
			}`}
		>
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
					<img src={theme === 'dark' ? LogoLight : LogoDark} alt='logo dark' />
				</div>
				<div
					className={`kanban__header-board_name ${
						showSidebar && isMobile && 'kanban__header-board_name-hide'
					}`}
				>
					{board.name}
				</div>
				<div
					className={`kanban__header-board_actions ${
						showSidebar && 'kanban__header-board_actions-sidebar'
					}`}
				>
					<button
						type='button'
						className={`${
							isTablet ? 'kanban__header-board_actions-add_small ' : ''
						} ${isDisabled ? 'kanban__header-board_actions-add_disabled' : ''}`}
						onClick={() => {
							setShowModal(true);
							setModalMode('addTask');
						}}
					>
						<TiPlus />
						{!isTablet ? 'Add New Task' : ''}
					</button>
					<div className='kanban__header-board_actions-menu'>
						<img
							src={Ellipsis}
							alt='menu icon'
							onClick={() => {
								setShowDropdown(true);
								isMobile && setShowSidebar(false);
							}}
						/>
						<div
							ref={dropdownRef}
							className={`${
								showDropdown
									? 'kanban__header-board_dropdown'
									: 'kanban__header-board_dropdown-hide'
							} ${theme === 'dark' && 'kanban__header-board_dropdown-dark'}`}
						>
							<ul>
								<li>
									<FaAt />
									{user && user.email}
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
