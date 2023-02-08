import axios from 'axios';

const API_URL = '/api/boards';

// Get all boards
const getBoards = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

// Create new board
const createBoard = async boardData => {
	const response = await axios.post(`${API_URL}/create`, boardData);
	return response.data;
};

// Get board by id
const getBoardById = async boardId => {
	const response = await axios.get(`${API_URL}/${boardId}`);
	return response.data;
};

// Update board
const updateBoard = async (boardId, boardData) => {
	const response = await axios.put(`${API_URL}/${boardId}`, boardData);
	return response.data;
};

// Delete board
const deleteBoard = async boardId => {
	const response = await axios.delete(`${API_URL}/${boardId}`);
	return response.data;
};

const boardService = {
	getBoards,
	createBoard,
	getBoardById,
	updateBoard,
	deleteBoard,
};

export default boardService;
