const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");
require('dotenv').config();

mongoDB();

app.use(cors({
  origin: ['https://bite-buddy-rosy.vercel.app'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json());

// Route setup
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData')); 
app.use(express.urlencoded({ extended: true }));

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
