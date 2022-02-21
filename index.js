const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let usuarios = [
    { id: 1, nombre: 'Federico' },
    { id: 2, nombre: 'Inu' },
    { id: 3, nombre: 'Lu' },
    { id: 4, nombre: 'Luqui' }
];


app.get('/', (req, res) => { res.send('<h1>Hello World!</h1>'); });
app.get('/api/usuarios', (req, res) => { res.json(usuarios); });
app.get('/api/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (usuario)
        res.json(usuario);
    else
        res.status(404).end();
});

app.delete('/api/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.filter(user => user.id !== id);
    res.status(204).end();
});

app.post('/api/usuarios/', (req, res) => {
    const usuario = req.body;

    const ids = usuarios.map(usr => usr.id);

    const maxId = Math.max(...ids);

    const newUsuario = {
        id: maxId + 1,
        nombre: usuario.nombre
    };

    usuarios = [...usuarios, newUsuario];

    res.json(newUsuario);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));