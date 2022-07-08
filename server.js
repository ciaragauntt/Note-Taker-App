const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

const noteData = require('./Develop/db/db.json')
const router = require('express').Router();

//setting up data parsing 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connecting the html files 
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
    );

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
    );

// api route

router.get('/notes', (req, res) => {
    store 
    .getNotes()
    .then(notes => {
        res.json(notes)
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    noteData
    .addNote(req.body)
    .then(note => {
        res.json(note)
    })
    .cath(err => {
        res.status(500).json(err)
    });
});

router.delete('/notes/id:', (req, res) => {
    noteData
    .removeNote(req.params.id)
    .then(() => res.json({okay: true}))
    .catch(err => res.status(500).json(err))
});

module.exports = router;

app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
    );