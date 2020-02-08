require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.SV_PORT;

app.get('/api/', (req, res) => res.send('Hello World!'));

app.get('/api/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.get('/', (req, res) => res.json({
    error: false,
    errorText: 'brak bledow xd',
}));

app.get('/api/users', function (req, res) {
    console.log(req.query.test);
    res.send('got it');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))