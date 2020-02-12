import 'dotenv/config';

import express from 'express';
const app = express();
const port = process.env.SV_PORT;

app.get('/api/', function(req, res) {
    return res.json({
        text: 'Hello World!',
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));