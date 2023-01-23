import axios from 'axios';

const API_URL = '/api/subtasks';

// create a subtask
const createSubtask = async (taskId, subtaskData) => {
	const response = await axios.post(`${API_URL}/${taskId}`, subtaskData);
	return response.data;
};

// get all subtasks from a task
const getSubtasks = async taskId => {
	const response = await axios.get(`${API_URL}/${taskId}`);
	return response.data;
};

// update a subtask
const updateSubtask = async (subtaskId, subtaskData) => {
	const response = await axios.put(`${API_URL}/${subtaskId}`, subtaskData);
	return response.data;
};

// delete a subtask
const deleteSubtask = async subtaskId => {
	const response = await axios.delete(`${API_URL}/${subtaskId}`);
	return response.data;
};

const subtaskService = {
	createSubtask,
	getSubtasks,
	updateSubtask,
	deleteSubtask,
};

export default subtaskService;
