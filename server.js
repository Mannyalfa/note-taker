const fs = require('fs');
const path = require ('path');
const express = require('express');

//used to store and retrieve notes
const dbJson = require('./db/db.json');

//set up express server app @ port 3001
const app = express();
const PORT = process.env.PORT || 3001;

// reads url/json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*js route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);*/


//add listener
app.listen(PORT, function() {
    console.log("App on port: " + PORT);
});

