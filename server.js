const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Testing route
app.get('/', (req, res) => res.send('API is running'));

// Define custom routes here
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tasks', require('./routes/api/tasks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running at ${PORT}`));
