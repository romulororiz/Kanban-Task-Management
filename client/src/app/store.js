// create redux toolkit store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import boardReducer from '@features/boards/boardSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		board: boardReducer,
	},
});
