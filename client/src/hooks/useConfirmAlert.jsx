// create hook using react-confirm-alert
import { useEffect, useState } from 'react';
import { confirmAlert as confirm } from 'react-confirm-alert';
import { useThemeContext } from '@hooks/useThemeContext';
import '@styles/scss/layout/ConfirmAlert.scss';

const useConfirmAlert = () => {
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [buttons, setButtons] = useState([
		{
			label: '',
			onClick: () => {},
		},
	]);

	// get theme from context
	const {
		state: { theme },
	} = useThemeContext();

	const confirmAlert = () => {
		confirm({
			title,
			message,
			buttons,
			closeOnEscape: true,
			closeOnClickOutside: true,
		});
	};

	useEffect(() => {
		if (title && message && buttons) {
			confirmAlert();
		}
	}, [title, message, buttons]);

	return [setTitle, setMessage, setButtons];
};

export default useConfirmAlert;
