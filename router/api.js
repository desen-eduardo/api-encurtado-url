import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
import shortlink from '../src/controller/shortLink.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/shorten',shortlink.create);
app.get('/shorten/id/:id',shortlink.getFind);
app.put('/shorten/id/:id',shortlink.update);
app.get('/shorten/date/:date_create',shortlink.find);
app.get('/shorten/:url',shortlink.link);

export default app;