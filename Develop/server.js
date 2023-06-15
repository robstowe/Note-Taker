//i created this page, based on what we used in class thru Module 11

const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();
const notes = require('./db/db.json') // todo: why do i need to pull from json file?


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html')) //this takes you to the index html, takes you to the homepage
  });

app.get('/api/notes', (req, res) => {
  res.json(notes); //this sends the note information itself
});  

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html')) //this takes you to the actual notes page
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newPost = {
      title,
      text,
      post_id: uuid(),
    }
    const response = {
      status: 'success',
      body: newPost,
    };

    console.log(body);
    res.status(201).json(response);
  }else {
    res.status(500).json('Error posting note');
  }
});  


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
    