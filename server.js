// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{console.log(`\x1b[36mServer running on localhost:\x1b[33m ${port}\x1b[0m`)});

// POST to projectData
app.post('/add', (req, res) => {
    for (const property in req.body) {
      projectData[property] = req.body[property];
    }
    res.send(projectData)
});

// GET projectData
app.get('/data', (req, res) => {
  res.send(projectData);
});