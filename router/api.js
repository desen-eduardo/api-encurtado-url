import express from 'express';
import shortlink from '../src/controller/shortLink.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/shorten/',(req,res)=>{
    res.send('veioo');
});
app.post('/shorten/create',shortlink.create);
app.get('/shorten/id/:id',shortlink.getFind);
app.put('/shorten/id/:id',shortlink.update);
app.get('/shorten/:url',shortlink.link);
app.get('/shorten/date/:date_create',shortlink.find);

export default app;