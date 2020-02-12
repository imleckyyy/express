import 'dotenv/config';

import express from 'express';
import { catchErrors, notFound } from './middlewares/errors';
import users from './routes/users';

const app = express();
const port = process.env.SV_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', users());

app.use(notFound);
app.use(catchErrors);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));