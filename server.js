require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const API_KEY = process.env.RAWG_API_KEY;

app.use(express.static(__dirname)); 

app.get('/api/games', async (req, res) => 
    {
        const searchQuery = req.query.search || '';
    try 
        {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
            params: {
                key: API_KEY,
                search: searchQuery,
                page_size: 10
            }
        });
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos de la API');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});