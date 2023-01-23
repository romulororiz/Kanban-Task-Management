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
			.addCase(createColumn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// create a new column
				const newColumn = {
					_id: action.payload._id,
					name: action.payload.name,
					board: action.payload.board,
				};
				state.columns.push(newColumn);
			})
			.addCase(createColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errors = action.payload;
			})
			.addCase(getBoardColumns.pending, state => {
				state.isLoading = true;
			})
			.addCase(getBoardColumns.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.columns = action.payload;
			})
			.addCase(getBoardColumns.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errors = action.payload;
			})
			.addCase(deleteColumn.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteColumn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.columns = state.columns.filter(
					column => column._id !== action.payload._id
				);
			})
			.addCase(deleteColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errors = action.payload;
			})
			.addCase(updateColumn.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateColumn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const updatedColumn = action.payload;
				// check if column id matches action payload id
				const index = state.columns.findIndex(
					column => column._id === updatedColumn._id
				);
				// if it does, update the column
				state.columns.splice(index, 1, updatedColumn);
			})
			.addCase(updateColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errors = action.payload;
			});
	},
});

export default columnSlice.reducer;
