import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subtaskService from './subtaskService';

const initialState = {
	subtasks: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	errors: [],
};

// create a subtask
export const createSubtask = createAsyncThunk(
	'client/createSubtask',
	async ({ taskId, subtaskData }, thunkAPI) => {
		try {
			return await subtaskService.createSubtask(taskId, subtaskData);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// get all subtasks from a task
export const getSubtasks = createAsyncThunk(
	'client/getSubtasks',
	async (taskId, thunkAPI) => {
		try {
			return await subtaskService.getSubtasks(taskId);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// update a subtask
export const updateSubtask = createAsyncThunk(
	'client/updateSubtask',
	async ({ subtaskId, subtaskData }, thunkAPI) => {
		try {
			return await subtaskService.updateSubtask(subtaskId, subtaskData);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// delete a subtask
export const deleteSubtask = createAsyncThunk(
	'client/deleteSubtask',
	async (subtaskId, thunkAPI) => {
		try {
			return await subtaskService.deleteSubtask(subtaskId);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

const subtaskSlice = createSlice({
	name: 'subtask',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(createSubtask.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(createSubtask.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			// create new task and add to tasks array
			const newSubtask = {
				_id: action.payload._id,
				title: action.payload.title,
				isCompleted: action.payload.isCompleted,
				task: action.payload.task,
			};
			state.subtasks.push(newSubtask);
		});
		builder.addCase(createSubtask.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
		builder.addCase(getSubtasks.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getSubtasks.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.subtasks = action.payload;
		});
		builder.addCase(getSubtasks.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
		builder.addCase(updateSubtask.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(updateSubtask.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			const updatedSubtask = action.payload;
			// find the task in the tasks array and update it
			const subtaskIndex = state.subtasks.findIndex(
				subtask => subtask._id === updatedSubtask._id
			);
			state.subtasks.splice(subtaskIndex, 1, updatedSubtask);
		});
		builder.addCase(updateSubtask.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
		builder.addCase(deleteSubtask.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(deleteSubtask.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			// remove the task from the tasks array
			state.subtasks.filter(subtask => subtask._id !== action.payload);
		});
		builder.addCase(deleteSubtask.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errors = action.payload;
		});
	},
});

export default subtaskSlice.reducer;
