import Ellipsis from '@assets/dashboard/icon-vertical-ellipsis.svg';
import LogoDark from '@assets/dashboard/logo-dark.svg';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { logout } from '@features/auth/authSlice';
import { useEffect, useRef, useState } from 'react';
import { FaAt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { CgLogOut } from 'react-icons/cg';
import useWindowSize from '@hooks/useWindowSize';
import { TiPlus } from 'react-icons/ti';
import Modal from '@components/modal/Modal';
import AddTask from '@components/modal/content/addTask/AddTask';
import '@styles/scss/layout/Header.scss';

const Header = ({
	setShowSidebar,
	showSidebar,
	user,
	boards,
	board,
	columns,
}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState('addTask');
	const [isDisabled, setIsDisabled] = useState(false);

	// get window width with useWindowSize hook
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
	}, [boards, columns, board]);

	return (
		<>
			{showModal && (
				<Modal
					title={modalMode === 'addTask' ? 'Add Task' : 'Edit Task'}
					showModal={showModal}
					setShowModal={setShowModal}
					modalMode={modalMode}
					setModalMode={setModalMode}
					content={
						<AddTask
							setShowModal={setShowModal}
							setModalMode={setModalMode}
							modalMode={modalMode}
						/>
					}
				/>
			)}
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
							} ${
								isDisabled ? 'kanban__header-board_actions-add_disabled' : ''
							}`}
							onClick={() => {
								setShowModal(true);
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
								}`}
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
		</>
	);
};
export default Header;
