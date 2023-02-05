import axios from 'axios';

const API_URL = '/api/columns';

// create a column
const createColumn = async (boardId, columnData) => {
	const response = await axios.post(`${API_URL}/${boardId}/create`, columnData);
	return response.data;
};

// get all columns for a board
const getBoardColumns = async boardId => {
	const response = await axios.get(`${API_URL}/board/${boardId}`);
	return response.data;
};

// get a column
const getColumnById = async columnId => {
	const response = await axios.get(`${API_URL}/${columnId}`);
	return response.data;
};

// Delete a column
const deleteColumn = async columnId => {
	const response = await axios.delete(`${API_URL}/${columnId}`);
	return response.data;
};

// Update a column
const updateColumn = async (columnData, columnId) => {
	const response = await axios.put(`${API_URL}/${columnId}`, columnData);
	return response.data;
};

const columnService = {
	createColumn,
	getColumnById,
	getBoardColumns,
	deleteColumn,
	updateColumn,
};

export default columnService;
