require('colors');
require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error/errorHandler');
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Init express app
const app = express();

// Initialize cookie parser
app.use(cookieParser());

// Resolve cors
app.use(cors());

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/columns', require('./routes/columnRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Error handler middleware
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
	});
}
app.listen(port, () => {
	console.log(`Server successfully started on port ${port} 🚀`);
});
