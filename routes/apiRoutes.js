const fs = require("fs");
const noteData = require("../db/db.json");

module.exports = function(app){


    //functions
    function writeToDB(notes){
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes);
        console.log (notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    //API's

    // return notes
    app.get("/api/notes", function(req, res){
        res.json(notesData);
    });

    // add notes
    app.post("/api/notes", function(req, res){

        // unique id
        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);

        // push to JSON array
        notesData.push(req.body);

        // wite notes to database
        writeToDB(notesData);
        console.log(notesData);

            res.json(req.body);
 
        });
    }