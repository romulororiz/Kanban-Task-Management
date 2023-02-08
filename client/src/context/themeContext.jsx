// create context for theme change
import { createContext, useReducer } from 'react';
import { themeReducer } from './themeReducer';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	// get theme from local storage
	const theme = localStorage.getItem('kanban-theme');

	const initialState = {
		theme: theme ? theme : 'light',
	};

	const [state, dispatch] = useReducer(themeReducer, initialState);

	// set theme to local storage
	localStorage.setItem('kanban-theme', state.theme);

	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{children}
		</ThemeContext.Provider>
	);
};
