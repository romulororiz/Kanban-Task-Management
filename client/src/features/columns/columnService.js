import axios from 'axios';

const API_URL = '/api/columns';

// create a column
const createColumn = async (boardId, columnData) => {
	const response = await axios.post(`${API_URL}/${boardId}/create`, columnData);
	return response.data;
};

// get all columns for a board
const getBoardColumns = boardId => {
	const response = axios.get(`${API_URL}/${boardId}`);

	return response.data;
};

// Delete a column
const deleteColumn = columnId => {
	const response = axios.delete(`${API_URL}/${columnId}`);

	return response.data;
};

// Update a column
const updateColumn = (columnData, columnId) => {
	const response = axios.put(`${API_URL}/${columnId}`, columnData);

	return response.data;
};

const columnService = {
	createColumn,
	getBoardColumns,
	deleteColumn,
	updateColumn,
};

export default columnService;
