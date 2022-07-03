require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sql = require('mssql')

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: process.env.SERVER_NAME,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', async (req, res) => {
    console.log("Get Api Called...")
    const users = await getUsers();
    res.send(users);
});

app.post('/api/insert', async (req, res) => {
    console.log("Insert Api Called...")
    console.log(req.body.firstName)
    // const users = await addUser(req.body.firstName, req.body.lastName, req.body.userName);
});

app.listen(3001, () => {
    console.log("running on port 3001");
})

const getUsers = async () => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * FROM Person`)
        return result;
    } catch(err) {
        console.log(err);
    }
}

const addUser = async (firstName, lastName, UserName) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT INTO Person VALUES ('${firstName}','${lastName}','${UserName}')`)
        return result;
    } catch(err) {
        console.log(err);
    }
}