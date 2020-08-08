const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const routes = require('./routes')

// Connect to database
require('./db');

let User = require('./models/User')

app.use(cors());
app.use(bodyParser.json());

app.use('/api/', routes)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});