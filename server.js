const fs = require('fs');

const path = require ('path');
const express = require('express');
const dbJson = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


    app.get("*", function(req, res){
        res.sendFile(path.join(__dirname, "./index.html"));
    });



app.listen(PORT, function() {
    console.log("App on port: " + PORT);
});

