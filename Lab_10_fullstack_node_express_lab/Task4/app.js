const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>My Page</title>
      </head>
      <body>
        <h1>Welcome to My Website</h1>
        <p>This is a simple HTML page using Express.</p>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>JavaScript</li>
        </ul>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Task 4 running on http://localhost:3000");
});