const express = require('express');
const app = express();

app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  res.send(`<h1>Hello ${name}</h1>`);
});

app.listen(3000, () => {
  console.log("Task 3 running on http://localhost:3000");
});