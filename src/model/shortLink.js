import getConnection from "../database/getConnection.js";

const shortLinkEntity = {
    async all() {
        const sql = `SELECT * FROM links`;
        const [rows] = await getConnection.execute(sql);
        return rows;
    },

    async find(type, value) {
        const sql = `SELECT * FROM links WHERE ${type} = ?`;
        const [rows] = await getConnection.execute(sql,[value]);
        return rows;
    },

    async findParams(value) {
        const sql = `SELECT * FROM links WHERE DATE_FORMAT(created_at,'%Y-%m-%d') = ?`;
        const [rows] = await getConnection.execute(sql,[value]);
        return rows;
    },

    async add(url_original, url_short) {
        const sql = `INSERT INTO links (url_original,url_short) VALUES (?, ?)`;
        return await getConnection.execute(sql, [url_original,url_short]);
    },

    async update(original_url,short_url,id) {
        const sql = `UPDATE links SET url_original = ? ,url_short = ? WHERE id = ?`;
        return await getConnection.execute(sql, [original_url,short_url,id]);
    }
}

export default shortLinkEntity;