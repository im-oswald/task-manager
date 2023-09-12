const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.use('/', (req, res) => res.send('API is working'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running at ${PORT}`));
