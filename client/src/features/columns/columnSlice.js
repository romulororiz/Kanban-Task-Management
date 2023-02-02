import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import columnService from './columnService';

const initialState = {
	columns: [],
	column: {},
	isLoading: false,
	errors: [],
};

// create a column
export const createColumn = createAsyncThunk(
	'column/createColumn',
	async ({ boardId, columnData }, { rejectWithValue }) => {
		try {
			return await columnService.createColumn(boardId, columnData);
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
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

// get a column
export const getColumnById = createAsyncThunk(
	'column/getColumnById',
	async (columnId, { rejectWithValue }) => {
		try {
			return await columnService.getColumnById(columnId);
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
				// create a new column
				const newColumn = {
					_id: action.payload._id,
					name: action.payload.name,
					color: action.payload.color,
					board: action.payload.board,
				};
				state.columns = [...state.columns, newColumn];
			})
			.addCase(createColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.errors = action.payload;
			})
			.addCase(getBoardColumns.pending, state => {
				state.isLoading = true;
			})
			.addCase(getBoardColumns.fulfilled, (state, action) => {
				state.isLoading = false;
				state.columns = action.payload;
			})
			.addCase(getBoardColumns.rejected, (state, action) => {
				state.isLoading = false;
				state.errors = action.payload;
			})
			.addCase(getColumnById.pending, state => {
				state.isLoading = true;
			})
			.addCase(getColumnById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.column = action.payload;
			})
			.addCase(getColumnById.rejected, (state, action) => {
				state.isLoading = false;
				state.errors = action.payload;
			})
			.addCase(deleteColumn.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteColumn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.columns = state.columns.filter(
					column => column._id !== action.payload._id
				);
			})
			.addCase(deleteColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.errors = action.payload;
			})
			.addCase(updateColumn.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateColumn.fulfilled, (state, action) => {
				state.isLoading = false;
				const updatedColumn = action.payload;
				const index = state.columns.findIndex(
					column => column._id === updatedColumn._id
				);
				state.columns.splice(index, 1, updatedColumn);
			})
			.addCase(updateColumn.rejected, (state, action) => {
				state.isLoading = false;
				state.errors = action.payload;
			});
	},
});

export default columnSlice.reducer;
