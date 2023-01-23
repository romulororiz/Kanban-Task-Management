import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import columnService from './columnService';

const initialState = {
	columns: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	errors: [],
};

// create a column
export const createColumn = createAsyncThunk(
	'client/createColumn',
	async ({ boardId, columnData }, thunkAPI) => {
		try {
			return await columnService.createColumn(boardId, columnData);
		} catch (error) {
			const errors = error.response.data.errors;
			return thunkAPI.rejectWithValue(errors);
		}
	}
);

// get all columns for a board
export const getBoardColumns = createAsyncThunk(
	'column/getBoardColumns',
	async (boardId, { rejectWithValue }) => {
		try {
			return await columnService.getBoardColumns(boardId);
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Delete a column
export const deleteColumn = createAsyncThunk(
	'column/deleteColumn',
	async (columnId, { rejectWithValue }) => {
		try {
			return await columnService.deleteColumn(columnId);
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Update a column
export const updateColumn = createAsyncThunk(
	'column/updateColumn',
	async ({ columnData, columnId }, { rejectWithValue }) => {
		try {
			return await columnService.updateColumn(columnData, columnId);
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const columnSlice = createSlice({
	name: 'column',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(createColumn.pending, state => {
				state.isLoading = true;
			})
			.addCase(createColumn.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				// create a new column
				const newColumn = {
					_id: payload._id,
					name: payload.name,
					board: payload.board,
				};
				state.columns.push(newColumn);
			})
			.addCase(createColumn.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.errors = payload;
			})
			.addCase(getBoardColumns.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.errors = [];
			})
			.addCase(getBoardColumns.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.errors = [];
				state.columns = action.payload;
			})
			.addCase(getBoardColumns.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.errors = action.payload.errors;
			})
			.addCase(deleteColumn.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.errors = [];
			})
			.addCase(deleteColumn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.errors = [];
				state.columns = state.columns.filter(
					column => column._id !== action.payload._id
				);
			})
			.addCase(deleteColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.errors = action.payload.errors;
			})
			.addCase(updateColumn.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.errors = [];
			})
			.addCase(updateColumn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.errors = [];
				state.columns = state.columns.map(column => {
					if (column._id === action.payload._id) {
						return action.payload;
					}
					return column;
				});
			})
			.addCase(updateColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.errors = action.payload.errors;
			});
	},
});

export default columnSlice.reducer;
