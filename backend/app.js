const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const locationroute = require('./location/location_route');
const universityroute = require('./university/university-route');
const stateroute=require("./state/state_route");
const districtroute=require("./district/district_route");
const cityroute=require('./city/city_route');
const registration_route = require('./registration/registration_route');
const agenda_route = require('./agenda/agenda_route');
const fees_route = require('./fees/fees_route');


//  CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ivms")

// Middleware to  JSON 
app.use(express.json());

// server upload images
app.use('/images',express.static('Images'))

// Routes
app.use('/', locationroute);
app.use('/',universityroute);
app.use('/',stateroute);
app.use('/',districtroute);
app.use('/',cityroute);
app.use('/', registration_route);
app.use('/', agenda_route);
app.use('/', fees_route);


app.get('/', (req, res) => {
  res.send("Connected to local host.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});