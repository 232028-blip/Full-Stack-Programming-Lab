const express = require('express');
const app = express();

app.get('/home', (req, res) => {
  res.send("<h1>Welcome Home</h1>");
});

app.get('/about', (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.get('/contact', (req, res) => {
  res.send("<h1>Contact Page</h1>");
});

app.listen(3000, () => {
  console.log("Task 2 running on http://localhost:3000");
});
