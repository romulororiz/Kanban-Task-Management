import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import '@styles/scss/index.scss';
import { ThemeContextProvider } from './context/themeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</Provider>
	</React.StrictMode>
);
