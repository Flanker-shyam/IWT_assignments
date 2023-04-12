const express = require('express');
const bodyParser = require("body-parser")
const conn = require("./database/mysql");
const cors = require('cors');
const cookieParser = require('cookie-parser'); 

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));

app.get("/flanker", (req,res)=>{
    let email = req.cookies.email
    if(email)
    {
        res.sendFile(__dirname+'/flanker.html');
    }
    else{
        res.redirect('/login');
    }  
})

app.get('/',(req,res)=>{
    let email = req.cookies.email
    if(email)
    {
        res.redirect('/flanker');
    }
    else{
        res.sendFile(__dirname+'/index.html');
    }
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+ "/register.html");
})

app.post("/register",(req,res)=>{
    const {name , email, password} = req.body;
    const mysql_query = `insert into student values("${name}","${email}","${password}")`;

    conn.query(mysql_query,(err, result, fields)=>{
        if(err){
            console.log(err);
            res.sendFile(__dirname+'/register.html')
        }
        else{
            console.log(result);
            res.sendFile(__dirname+'/login.html');
        }
    })
});

app.post("/login",(req,res)=>{
    const {email, password} = req.body;

    const mysql_query = `select * from student where email = "${email}" and password="${password}"`;
    conn.query(mysql_query,(err, result,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        else if(result.length==1)
        {
            res.cookie('email', email,
            {
                maxAge:60*60*1000,
                sameSite:'lax',
                httpOnly:true,
            });
            res.redirect('/flanker'); 
        }
        else{
            res.send(`<p>Invalid login credentials</p>
            <form action="/register" method="GET">
        <button type="submit">Register</button>
    </form>
    <form action="/login" method="GET">
        <button type="submit">Login</button>
    </form>`)
        }
    })
})

app.post("/logout", (req,res)=>{
    res.clearCookie('email');
    res.redirect('/');
})

app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("running at 3000");
    }
})