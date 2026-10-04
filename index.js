const express = require('express');
const cors = require('cors');
const cuevana3 = require('cuevana3');

const app = express();
app.use(cors());

// Ruta para obtener películas del catálogo de Cuevana (0: Últimas, 2: Más vistas)[cite: 2]
app.get('/peliculas/:type', (req, res) => {
    const type = parseInt(req.params.type) || 0;
    cuevana3.getMovies(type)
        .then(resultados => res.json(resultados))
        .catch(err => res.status(500).json({ error: 'Error al obtener películas' }));
});

// Ruta para buscar películas relacionadas por texto[cite: 2]
app.get('/buscar/:query', (req, res) => {
    const query = req.params.query;
    cuevana3.getSearch(query)
        .then(resultados => res.json(resultados))
        .catch(err => res.status(500).json({ error: 'Error en la búsqueda' }));
});

// Ruta para extraer los enlaces de reproducción de un ID específico[cite: 2]
app.get('/enlaces', (req, res) => {
    const idCuevana = req.query.id; 
    if (!idCuevana) {
        return res.status(400).json({ error: 'Falta el parámetro id' });
    }

    cuevana3.getLinks(idCuevana)
        .then(enlaces => res.json(enlaces))
        .catch(err => res.status(500).json({ error: 'Error extrayendo enlaces' }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de Cuevana corriendo en el puerto ${PORT}`);
});
