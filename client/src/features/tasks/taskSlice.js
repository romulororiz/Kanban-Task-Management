import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const initialState = {
	tasks: [],
	task: {},
	isSuccess: false,
	isError: false,
	isLoading: false,
	errors: [],
};

// create a task
export const createTask = createAsyncThunk(
	'client/createTask',
	async ({ columnId, taskData }, thunkAPI) => {
		try {
			return await taskService.createTask(columnId, taskData);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// get all tasks from a board
export const getBoardTasks = createAsyncThunk(
	'client/getBoardTasks',
	async (boardId, thunkAPI) => {
		try {
			return await taskService.getBoardTasks(boardId);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// get a task by id
export const getTaskById = createAsyncThunk(
	'client/getTaskById',
	async (taskId, thunkAPI) => {
		try {
			return await taskService.getTaskById(taskId);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// update a task
export const updateTask = createAsyncThunk(
	'client/updateTask',
	async ({ taskId, taskData }, thunkAPI) => {
		try {
			return await taskService.updateTask(taskId, taskData);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// delete a task
export const deleteTask = createAsyncThunk(
	'client/deleteTask',
	async (taskId, thunkAPI) => {
		try {
			return await taskService.deleteTask(taskId);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(createTask.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(createTask.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.task = action.payload;
		});
		builder.addCase(createTask.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
		builder.addCase(getBoardTasks.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(getBoardTasks.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.tasks = action.payload;
		});
		builder.addCase(getBoardTasks.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
		builder.addCase(getTaskById.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(getTaskById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.task = action.payload;
		});
		builder.addCase(getTaskById.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
		builder.addCase(updateTask.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.task = action.payload;
		});
		builder.addCase(updateTask.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
		builder.addCase(deleteTask.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.task = action.payload;
		});
		builder.addCase(deleteTask.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
	},
});

export default taskSlice.reducer;
