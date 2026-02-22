import Shorturly from 'shorturly';
import shortLinkEntity from '../model/shortLink.js';

const shortlink = {
   
    async create(req, res) {
        try {
            
            if (!req.body?.url) {
                return res.status(400).json({error: "O campo obrigatório no corpo da requisição.",
                    message: "O campo 'url' é obrigatório no corpo da requisição.",
                    statusCode: 400
                });
            }

            const originalUrl = req.body?.url;
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';
            const shortener = new Shorturly();
            shortener.baseUrl = baseUrl+'shorten/';
            const shortUrl = shortener.shortenUrl(originalUrl);
            
            await shortLinkEntity.add(originalUrl,shortUrl); 
            
            return res.status(201).json({
                message:[
                    {
                        url:shortUrl,
                    }    
                ],
                statusCode:201
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                error: {
                    type: "INTERNAL_SERVER_ERROR",
                    message: "Ocorreu um erro interno ao criar o link."
                }
            });
        }
    },

    async getFind(req, res) {

        if (!req.params?.id) {
            return res.status(400).json({
                error: "Parâmetro obrigatório não informado.",
                message: "O parâmetro 'id' deve ser informado na URL.",
                path: "/shorten/id/:id",
                statusCode: 400
            });
        }

        const id = req.params?.id;
        res.status(200).json({
            message:await shortLinkEntity.find('id',id),
            statusCode:200
        });

    },

    async find(req, res) {

        if (!req.params?.date_create) {
            return res.status(400).json({error: "Parâmetro obrigatório não informado.",
                message: "O parâmetro 'date' deve ser informado na URL.",
                path: "/shorten/date/:date",
                statusCode: 400
            });
        }

        const dateCreate = req.params?.date_create;
        res.status(200).json({
            message:await shortLinkEntity.findDate(dateCreate),
            statusCode:200
        });

    },

    async update(req, res) {
        try {

            if (!req.params?.id) {
                return res.status(400).json({error: "Parâmetro obrigatório não informado.",
                    message: "O parâmetro 'id' deve ser informado na URL.",
                    path: "/shorten/id/:id",
                    statusCode: 400
                });
            }

            if (!req.body?.url) {
                return res.status(400).json({error: "O campo obrigatório no corpo da requisição.",
                    message: "O campo 'url' é obrigatório no corpo da requisição.",
                    statusCode: 400
                });
            }

            const originalUrl = req.body?.url;
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';
            const shortener = new Shorturly();
            shortener.baseUrl = baseUrl+'shorten/';
            const shortUrl = shortener.shortenUrl(originalUrl);
            
            const id = req.params?.id;
            await shortLinkEntity.update(originalUrl,shortUrl,id);

            
            return res.status(200).json({
                message:await shortLinkEntity.find('id',id)
            });
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: {
                    type: "INTERNAL_SERVER_ERROR",
                    message: "Ocorreu um erro interno ao atualizar o link."
                },
                statusCode:500
            });
        }

    },

    async link(req, res) {
        try {
            if (!req.params?.url) {
                return res.status(400).json({error: "Parâmetro obrigatório não informado.",
                    error: "O parâmetro 'url' é obrigatório na rota.",
                    statusCode:400
                });
            }
    
            const url = req.params?.url;
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';
            const link = await shortLinkEntity.find('url_short',baseUrl+'shorten/'+url);

            return res.redirect(302, link[0].url_original);

        } catch (error) {

            return res.status(500).json({
                success: false,
                error: {
                    type: "INTERNAL_SERVER_ERROR",
                    message: "Ocorreu um erro interno ao ao redirecionar."
                },
                statusCode:500
            });
        }
        
    }
};

export default shortlink;