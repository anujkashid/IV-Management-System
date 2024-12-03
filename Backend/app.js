const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./route');


//  CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/KnightOne")

// Middleware to  JSON 
app.use(express.json());

// server upload images
app.use('/images',express.static('Images'))

// Routes
app.use('/', route);


app.get('/', (req, res) => {
  res.send("Connected to local host.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});