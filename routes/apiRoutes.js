const fs = require("fs");
const { report } = require("process");
const { v1: uuidv1 } = require('uuid');
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
        res.json(noteData);
    });

    // add notes
    app.post("/api/notes", function(req, res){
        console.log(req.body)

        // unique id
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv1()
        }

        // push to JSON array
        noteData.push(newNote);

        // write notes to database
        writeToDB(noteData);
        console.log(noteData);

            res.json(req.body);
 
        });
    }