
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const uuid = require('./helpers/uuid');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(express.static('public'));
// app.listen(PORT, () => console.log(`Listening on PORT: PORT`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html')) //this takes you to the index html, takes you to the homepage
  });


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html')) //this takes you to the actual notes page
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid();
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
          if (err) throw err;
          res.json(notes);
      });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      const newNotes = notes.filter((note) => note.id !== id);
      fs.writeFile('./db/db.json', JSON.stringify(newNotes, null, 2), (err) => {
          if (err) throw err;
          res.json(newNotes);
      });
  });
});




app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);
    