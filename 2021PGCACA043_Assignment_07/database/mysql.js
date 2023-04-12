const mysql = require('mysql');
require('dotenv').config()

username = process.env.USER_NAME
password = process.env.PASSWORD
host = process.env.HOST
db = process.env.DATABASE

let conn = mysql.createConnection({
    host:host,
    user:username,
    password:password,
    database:db
});

conn.connect((err)=>{
    if(err){
        console.log("Error connecting to database: ",err);
    }
    else{
        console.log("Connected to database");
    }
})

module.exports = conn;