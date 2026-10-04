const express = require('express');
const cors = require('cors');
const cuevana3 = require('cuevana3');

const app = express();
app.use(cors());

// Ruta para buscar películas
app.get('/buscar/:query', (req, res) => {
    const query = req.params.query;
    
    cuevana3.getSearch(query)
        .then(resultados => res.json(resultados))
        .catch(err => res.status(500).json({ error: 'Error en la búsqueda' }));
});

// Ruta corregida para cumplir con las reglas de Express 5
app.get('/enlaces/:id(*)', (req, res) => {
    // Capturamos el ID usando el nuevo nombre del parámetro
    const idCuevana = req.params.id; 
    
    cuevana3.getLinks(idCuevana)
        .then(enlaces => res.json(enlaces))
        .catch(err => res.status(500).json({ error: 'Error extrayendo enlaces' }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de Cuevana corriendo en el puerto ${PORT}`);
});
