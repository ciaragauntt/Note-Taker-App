const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

const noteData = require('./db/db.json')
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

app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
    );

