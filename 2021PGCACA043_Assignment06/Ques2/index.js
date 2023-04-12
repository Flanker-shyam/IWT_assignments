const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let users = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/register">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br>
      <label for="contact">Contact:</label>
      <input type="text" id="contact" name="contact"><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password"><br>
      <label for="repeat-password">Repeat Password:</label>
      <input type="password" id="repeat-password" name="repeat-password"><br>
      <button type="submit">Register</button>
    </form>
  `);
});

app.post('/register', (req, res) => {
  const { name, email, contact, password, 'repeat-password': repeatPassword } = req.body;

  if (!name || !email || !contact || !password || !repeatPassword) {
    return res.status(400).send('Please fill in all fields');
  }

  if (password !== repeatPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const firstName = name.split(' ')[0].toLowerCase();
  let count = 1;
  let userId = `${firstName}.${count}`;

  while (users.includes(userId)) {
    count++;
    userId = `${firstName}.${count}`;
  }

  users.push(userId);

  res.send(`Welcome ${name}, your user id is ${userId}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
