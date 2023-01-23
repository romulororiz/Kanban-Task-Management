import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import Cookies from 'js-cookie';

// get user from cookie
const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

const initialState = {
	user: user ? user : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	errors: [],
};

// Register new user
export const register = createAsyncThunk(
	'auth/register',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await authService.registerUser(userData);
			return response;
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
		}
	}
);

// Login user
export const login = createAsyncThunk(
	'auth/login',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await authService.loginUser(userData);
			return response;
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
		}
	}
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

// Auth Slice Reducer
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearErrors: state => {
			state.errors = [];
		},
	},
	extraReducers: builder => {
		builder
			// Register
			.addCase(register.pending, state => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, state => {
				state.isLoading = false;
				state.isSuccess = true;
				// get user data from cookie
				const user = JSON.parse(Cookies.get('user'));
				state.user = user;
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.errors = payload;
			})
			// Login
			.addCase(login.pending, state => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, state => {
				state.isLoading = false;
				state.isSuccess = true;
				// get user data from cookie
				const user = JSON.parse(Cookies.get('user'));
				state.user = user;
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.errors = payload;
			})
			// Logout
			.addCase(logout.fulfilled, state => {
				state.user = null;
			});
	},
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
