import 'dotenv/config';
import app from './router/api.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('conectouuuu');
});
