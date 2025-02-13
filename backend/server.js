const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());  // If frontend is on a different port (e.g., 5000), keep this
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/todoList')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

// Routes
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
