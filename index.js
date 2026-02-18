import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = [];

app.get('/',(req,res) => {
    res.json({mensagem:data});
});

app.post('/create',(req, res) => {
    const uuid = Date.now();
    const date = new Date().toLocaleDateString('pt-BR').split('/');
    const date_create = `${date[2]}-${date[1]}-${date[0]}`;
    data.push({
        uuid,
        url:`http://localhost:3000/${uuid}`,
        url_original:req.body.url,
        date_create_at: date_create
    });

    res.json({mensagem:{
        uuid,
        url:`http://localhost:3000/${uuid}`,
        date_create_at: date_create
    }});
});

app.get('/:url',(req, res) => {
    const url = req.params.url;
    const url_original = data.find((items) => { 
        const result = items.url.split("/").pop();
        return result === url;
    });
   
    if (url_original) {
        return res.redirect(302,url_original.url_original);
    }

    return res.status(404).json({
        messagem:"nada foi encontrado"
    });
})

app.listen(3000,()=>{
    console.log('conectouuuu');
});
