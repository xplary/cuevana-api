const express = require('express');
const cors = require('cors');
const cuevana3 = require('cuevana3'); // Inicializamos el scraper[cite: 2]

const app = express();
app.use(cors()); // Permite que tu GitHub Pages se conecte sin bloqueos

// Ruta para buscar películas
app.get('/buscar/:query', (req, res) => {
    const query = req.params.query;
    // Usamos el método getSearch según la documentación[cite: 2]
    cuevana3.getSearch(query)
        .then(resultados => res.json(resultados))
        .catch(err => res.status(500).json({ error: 'Error en la búsqueda' }));
});

// Ruta para obtener los enlaces de video
app.get('/enlaces/*', (req, res) => {
    // El id de Cuevana incluye barras (ej: '42040/without-remorse')[cite: 3]
    const idCuevana = req.params[0]; 
    
    // Usamos el método getLinks para obtener los reproductores[cite: 2]
    cuevana3.getLinks(idCuevana)
        .then(enlaces => res.json(enlaces))
        .catch(err => res.status(500).json({ error: 'Error extrayendo enlaces' }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de Cuevana corriendo en el puerto ${PORT}`);
});