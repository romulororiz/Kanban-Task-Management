import axios from 'axios';

const API_URL = '/api/tasks';

// Get all tasks
export const getTasks = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

// Get a task by id
export const getTaskById = async taskId => {
	const response = await axios.get(`${API_URL}/${taskId}`);
	return response.data;
};

// Create a task
export const createTask = async (columnId, taskData) => {
	const response = await axios.post(`${API_URL}/${columnId}/create`, taskData);
	return response.data;
};

// Update a task
export const updateTask = async (taskId, taskData) => {
	const response = await axios.put(`${API_URL}/${taskId}`, taskData);
	return response.data;
};

// Delete a task
export const deleteTask = async taskId => {
	const response = await axios.delete(`${API_URL}/${taskId}`);
	return response.data;
};

const taskService = {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
};

export default taskService;