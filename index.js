const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require("dotenv").config();

const { insertUser, readAllUser, updateUser, removeUser } = require("./operations");

const app = express();
const port = process.env.PORT || 3000; //OBLIGATORIAMENTE PARA HEROKU EL PUERTO TIENE QUE SE EN MAYUSCULAS LPM

const conn = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
});

conn.getConnection((err) => {
    if (err) throw err;
    console.log("Conneted to database");
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('<h1>Hello World!</h1>'); });

app.get("/api/insert", (req, res) => {
    let data = {
        name: 'Federico',
        mail: 'federicodelillo@gmail.com'
    };
    insertUser(conn, data, (result) => {
        res.json(result);
    });
});

app.get("/api/readAll", (req, res) => {
    readAllUser(conn, (result) => {
        res.json(result);
    });
});

app.get("/api/update", (req, res) => {
    let data = {
        id: 5,
        name: 'Federico',
        mail: 'federicodelillo@hotmail.com'
    };
    updateUser(conn, data, (result) => {
        res.json(result);
    });
});

app.get("/api/remove", (req, res) => {
    let data = {
        id: 3
    };
    removeUser(conn, data, (result) => {
        res.json(result);
    });
});

/*app.get('/api/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(user => user.id === id);
    if (usuario)
        res.json(usuario);
    else
        res.status(404).end();
});*/

/*app.delete('/api/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.filter(user => user.id !== id);
    res.json(usuario)
    res.status(204).end();
});*/

/*app.post('/api/usuarios/', (req, res) => {
    const usuario = req.body;
    const ids = usuarios.map(usr => usr.id);
    const maxId = Math.max(...ids);
    const newUsuario = {
        id: maxId + 1,
        nombre: usuario.nombre
    };
    usuarios = [...usuarios, newUsuario];
    res.json(newUsuario);
});*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`));