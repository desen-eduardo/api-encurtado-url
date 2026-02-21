import express from 'express';
import shortlink from '../src/controller/shortLink.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',shortlink.getAll);
app.post('/create',shortlink.create);
app.get('/edit/:id',shortlink.getFind);
app.put('/:id',shortlink.update);
app.get('/:url',shortlink.link);
app.get('/listing/:date_create',shortlink.find);

export default app;