// create a slice of state for the board
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import boardService from './boardService';

const initialState = {
	boards: [],
	board: {},
	isLoading: false,
	errors: [],
};

// Get all boards
export const getBoards = createAsyncThunk(
	'board/getBoards',
	async (_, { rejectWithValue }) => {
		try {
			return await boardService.getBoards();
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
		}
	}
);

// Create new board
export const createBoard = createAsyncThunk(
	'board/createBoard',
	async (boardData, { rejectWithValue }) => {
		try {
			return await boardService.createBoard(boardData);
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
		}
	}
);

// Get board by id
export const getBoardById = createAsyncThunk(
	'board/getBoardById',
	async (boardId, { rejectWithValue }) => {
		try {
			return await boardService.getBoardById(boardId);
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
		}
	}
);

// Update board
export const updateBoard = createAsyncThunk(
	'board/updateBoard',
	async ({ boardId, boardData }, { rejectWithValue }) => {
		try {
			return await boardService.updateBoard(boardId, boardData);
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
		}
	}
);

// Delete board
export const deleteBoard = createAsyncThunk(
	'board/deleteBoard',
	async (boardId, { rejectWithValue }) => {
		try {
			return await boardService.deleteBoard(boardId);
		} catch (error) {
			const errors = error.response.data.errors;
			return rejectWithValue(errors);
		}
	}
);

// Board Slice Reducer
const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		clearErrors: state => {
			state.errors = [];
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getBoards.pending, state => {
				state.isLoading = true;
			})
			.addCase(getBoards.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.boards = payload;
			})
			.addCase(getBoards.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.errors = payload;
			})
			.addCase(createBoard.pending, state => {
				state.isLoading = true;
			})
			.addCase(createBoard.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				const newBoard = {
					_id: payload._id,
					name: payload.name,
				};
				state.boards.push(newBoard);
			})
			.addCase(createBoard.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.errors = payload;
			})
			.addCase(getBoardById.pending, state => {
				state.isLoading = true;
			})
			.addCase(getBoardById.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.board = payload;
			})
			.addCase(getBoardById.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.errors = payload;
			})
			.addCase(updateBoard.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateBoard.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				const updatedBoard = payload;
				const index = state.boards.findIndex(
					board => board._id === updatedBoard._id
				);
				state.boards.splice(index, 1, updatedBoard);
			})
			.addCase(updateBoard.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.errors = payload;
			})
			.addCase(deleteBoard.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteBoard.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.boards = state.boards.filter(board => board._id !== payload._id);
			})
			.addCase(deleteBoard.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.errors = payload;
			});
	},
});

export const { clearErrors } = boardSlice.actions;

export default boardSlice.reducer;
