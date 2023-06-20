
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(express.static('public'));
app.listen(PORT, () => console.log(`Listening on PORT: PORT`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html')) //this takes you to the index html, takes you to the homepage
  });

app.get('/api/notes', (req, res) => {
  res.json(`${req.method} request recieved for notes`); //this sends the note information itself
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

// app.post('/api/notes', bodyParser.json(), (req, res) => {
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   console.info(`${req.method} request recieved for notes`);

//   const { title, text } = req.body;
//   if (title && text) {
//     const newPost = {
//       title,
//       text,
//       post_id: uuid(),
//     }
    
//   const reviewString = JSON.stringify(newPost);
//   fs.readFile('./db/db.json', 'utf8', (error, data) => {
//     console.log(JSON.parse(data));
//   })
//   fs.writeFile('./db/db.json', reviewString, (err) => {
//     err
//     ? console.error(err)
//     : console.log(`Review for ${newPost.Title} has been written to JSON file`)
//   });
//   const response = {
//     status: 'success',
//     body: newPost,
//   };

//   console.log(req.body);
//   res.status(201).json(response);
// }else {
//   res.status(500).json('Error posting note');
// }
// });  


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

//how can i rework this code to work for my assignment, is this even needed?
const mainEL = $("main");
fetch ('/api/users', {
  method: 'GET'
})
.then( res => res.json())
.then(userData => {
  console.log(userData)
  for (let i = 0; i < userdata.length; i++){
    let h1El = $("<h1>");
    h1El.text(`${userData[i].first_name} ${userData[i].last_name}`)
    mainEL.append(h1El)
  }
});


    