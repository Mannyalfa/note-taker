const fs = require("fs");
const { report } = require("process");
const { v1: uuidv1, stringify } = require('uuid');
const noteData = require("../db/db.json");

module.exports = function (app) {


    //functions
    function writeToDB(notes) {
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes);
        console.log(notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }

    //API's

    // return notes
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    // add notes
    app.post("/api/notes", function (req, res) {
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


    app.delete('/api/notes/:id', function (req, res) {
        // get id number of note to delete
        const deleteNote = req.params.id;
        console.log(deleteNote);

        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            dbData = JSON.parse(data);
            // compare note id for note to be deleted
            for (let i = 0; i < dbData.length; i++) {
                if (dbData[i].id === deleteNote) {
                    dbData.splice(i, 1);
                }
            }
            console.log(dbData);
            stringData = JSON.stringify(dbData);
            console.log(stringData)
            writeToDB(stringData);
        });
        // Express response.status(204)
        res.status(204).send();
    });

}






