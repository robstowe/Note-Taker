
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const uuid = require('./helpers/uuid');
// const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(express.static('public'));

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

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const notes = JSON.parse(data);
    res.json(notes);
  })
});
// got this from adam trying to get it to work 
// class Post {
//   async postNote(note) {
//     const { title, text } = note;
//     if (!title || !text ) {
//       throw new Error ('Please enter a name and info for the note')
//     }

//     const postedNote = { title, text, id, uuid};
//     const notes = await this.getNotes();
//     notes.push(postedNote);
//     await this.write(notes);
//     return postedNote;
//   }
// };


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
    