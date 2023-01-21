import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import Cookies from 'js-cookie';

// get user from cookie
const user = JSON.parse(Cookies.get('user'));

const initialState = {
	user: user ? user : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: '',
};

// Register new user
export const register = createAsyncThunk(
	'auth/register',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await authService.register(userData);
			return response;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return rejectWithValue(message);
		}
	}
);

// Login user
export const login = createAsyncThunk(
	'auth/login',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await authService.login(userData);
			return response;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return rejectWithValue(message);
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
	reducers: {},
	extraReducers: builder => {
		builder
			// Register
			.addCase(register.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// get user data from cookie
				const user = JSON.parse(Cookies.get('user'));
				state.user = user;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// Login
			.addCase(login.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// get user data from cookie
				const user = JSON.parse(Cookies.get('user'));
				state.user = user;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// Logout
			.addCase(logout.fulfilled, (state, action) => {
				state.user = null;
			});
	},
});
