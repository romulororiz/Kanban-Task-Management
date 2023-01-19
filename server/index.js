require('colors');
require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Init express app
const app = express();

// Resolve cors
app.use(cors());

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes
app.route('/').get((req, res) => res.send('API is running...'));

// Error handler middleware
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
	// Serve frontend
	// Set build folder as static
	app.use(express.static(path.join(__dirname, 'client/dist')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
	});
}

app.listen(port, () => {
	console.log(`Server successfully started on port ${port} 🚀`);
});
