import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const initialState = {
	tasks: [],
	task: {},
	isLoading: false,
	errors: [],
};

// create a task
export const createTask = createAsyncThunk(
	'task/createTask',
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
	'task/getBoardTasks',
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
	'task/getTaskById',
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
	'task/updateTask',
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
			// create new task and add to tasks array
			const newTask = {
				_id: action.payload._id,
				title: action.payload.title,
				description: action.payload.description,
				subtasks: action.payload.subtasks,
				column: action.payload.column,
				board: action.payload.board,
			};
			state.tasks.push(newTask);
		});
		builder.addCase(createTask.rejected, (state, action) => {
			state.isLoading = false;
			state.errors = action.payload;
		});
		builder.addCase(getBoardTasks.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getBoardTasks.fulfilled, (state, action) => {
			state.isLoading = false;
			state.tasks = action.payload;
		});
		builder.addCase(getBoardTasks.rejected, (state, action) => {
			state.isLoading = false;
			state.errors = action.payload;
		});
		builder.addCase(getTaskById.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getTaskById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.task = action.payload;
		});
		builder.addCase(getTaskById.rejected, (state, action) => {
			state.isLoading = false;
			state.errors = action.payload;
		});
		builder.addCase(updateTask.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.isLoading = false;
			const updatedTask = action.payload;
			const taskIndex = state.tasks.findIndex(
				task => task._id === updatedTask._id
			);
			state.tasks.splice(taskIndex, 1, updatedTask);
		});
		builder.addCase(updateTask.rejected, (state, action) => {
			state.isLoading = false;
			state.errors = action.payload;
		});
		builder.addCase(deleteTask.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			state.isLoading = false;
			state.tasks = state.tasks.filter(task => task._id !== action.payload._id);
		});
		builder.addCase(deleteTask.rejected, (state, action) => {
			state.isLoading = false;
			state.errors = action.payload;
		});
	},
});

export default taskSlice.reducer;
