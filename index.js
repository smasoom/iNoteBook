const connectTomongo = require('./db'); // Ensure your MongoDB connection file is correctly set up
const express = require('express');
connectTomongo();

const app = express();
const port = 5000

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the auth route
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
