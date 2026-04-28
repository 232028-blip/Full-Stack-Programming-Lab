const express = require('express');
const app = express();

const students = ["Ali", "Ahmed", "Sara", "Ayesha"];

app.get('/', (req, res) => {
  let list = "<h1>Student List</h1><ul>";

  students.forEach(student => {
    list += `<li>${student}</li>`;
  });

  list += "</ul>";
  res.send(list);
});

app.listen(3000, () => {
  console.log("Task 1 running on http://localhost:3000");
});