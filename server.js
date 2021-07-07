//required modules
const path = require ('path')
const express = require('express');

//used to store and retrieve notes
const dbJson = require('./db/db.json')

//set up express server app @ port 3001
const app = express();
const PORT = process.env.PORT || 3001;

//add listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

