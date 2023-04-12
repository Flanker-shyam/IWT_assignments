const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let users = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`<form method="GET" action="/register">
    <button> register</button></form>
    <form method="GET" action="/login">
    <button> login</button></form>`)
});

app.get('/register', (req, res) => {
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
})

app.get('/login', (req, res) => {
    res.send(`
    <form method="POST" action="/login">
      <label for="userid">userId:</label>
      <input type="text" id="userid" name="userid"><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password"><br>
      <button type="submit">login</button>
    </form>
  `);
})

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

    const user = {
        name : name,
        userId:userId,
        email:email,
        contact:contact,
        password:password
    }
    console.log("greee",user);

    users.push(user);

    res.send(`Welcome ${name}, your user id is ${userId}
    <form method="GET" action="/login">
    <button> login</button></form>`);
});

app.post('/login',(req,res)=>{
    const {userid, password} = req.body;

    for(let user of users){
        console.log(user);
        if(user.userId === userid && user.password === password){
            res.send(`Welcome ${user.name}`)
            console.log("i am here!");
            return;
        }
    }
    res.send(`Invalid login credentials`);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

