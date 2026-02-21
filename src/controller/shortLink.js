import Shorturly from 'shorturly';
import shortLinkEntity from '../model/shortLink.js';

const shortlink = {
   async getAll(req, res) {
        res.status(200).json({
            message:await shortLinkEntity.all()
        });
    },

    async create(req, res) {
        if (!req.body?.url) {
            return res.status(400).json({
                error: "O campo 'url' é obrigatório"
            });
        }

        try {
            const originalUrl = req.body?.url;
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';
            const shortener = new Shorturly();
            shortener.baseUrl = baseUrl;
            const shortUrl = shortener.shortenUrl(originalUrl);
            
            await shortLinkEntity.add(originalUrl,shortUrl); 
            
            return res.status(201).json({
                message:{
                    url:shortUrl
                }
            })
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao criar link"
            });
        }
    },

    async getFind(req, res) {

        if (!req.params?.id) {
            return res.status(404).json({
                error: "nada foi encontrado"
            });
        }

        const id = req.params?.id;
        res.status(200).json({
            message:await shortLinkEntity.find('id',id)
        });

    },

    async find(req, res) {

        if (!req.params?.date_create) {
            return res.status(404).json({
                error: "nada foi encontrado"
            });
        }

        const dateCreate = req.params?.date_create;
        res.status(200).json({
            message:await shortLinkEntity.findParams(dateCreate)
        });

    },

    async update(req, res) {
        try {

            if (!req.params?.id) {
                return res.status(404).json({
                    error: "nada foi encontrado"
                });
            }

            if (!req.body?.url) {
                return res.status(404).json({
                    error: "nada foi encontrado"
                });
            }

            const originalUrl = req.body?.url;
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';
            const shortener = new Shorturly();
            shortener.baseUrl = baseUrl;
            const shortUrl = shortener.shortenUrl(originalUrl);
            
            const id = req.params?.id;
            await shortLinkEntity.update(originalUrl,shortUrl,id);

            
            return res.status(200).json({
                message:await shortLinkEntity.find('id',id)
            });
            
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao atualizar o link"
            });
        }

    },

    async link(req, res) {
        try {
            if (!req.params?.url) {
                return res.status(404).json({
                    error: "nada foi encontrado"
                });
            }
    
            const url = req.params?.url;
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';
            const link = await shortLinkEntity.find('url_short',baseUrl+url);
            return res.redirect(302, link[0].url_original);

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao processar redirecionamento"
            });
        }
        
    }
};

export default shortlink;