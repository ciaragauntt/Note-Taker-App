const express = require('express');
const path = require('path');
const fs = require("fs");


const app = express();
const PORT = 3001;

const noteData = require('./public/db/db.json')
const router = require('express').Router();

//setting up data parsing 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connecting the html files 
app.use(express.static('root'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
    );

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
    );

// api route

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/db/db.json"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  

app.post("/api/notes", function (req, res) {
    let notesSaved = JSON.parse(fs.readFileSync("./public/db/db.json", "utf8"));
    let note = req.body;
    let uniqueID = notesSaved.length.toString();
    note.id = uniqueID;
    notesSaved.push(note);
  
    fs.writeFileSync("./public/db/db.json", JSON.stringify(notesSaved));
   
    res.json(notesSaved);
  });
  
app.delete("/api/notes/:id", function (req, res) {
    let notes = JSON.parse(fs.readFileSync("./public/db/db.json", "utf8"));
    let id = req.params.id;
    let newID = 0;
    
    notes = notes.filter((note) => {
      return note.id != id;
    });
  
    for (note of notes) {
      note.id = newID.toString();
      newID++;
    }
  fs.writeFileSync("./public/db/db.json", JSON.stringify(notes));
    res.json(notes);
  });
  

module.exports = router;

app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
    );