const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");

mongoDB();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json());

// Route setup
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData')); // Ensure this matches

app.get('/', (req, res) => {
  res.send('Hello World! -----');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please choose another port.`);
  } else {
    console.error('An error occurred:', err);
  }
});
