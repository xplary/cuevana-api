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

// Ruta por Query Parameter (Evita los errores de Express 5 con las barras "/")
app.get('/enlaces', (req, res) => {
    // Ahora lo capturamos desde la URL así: /enlaces?id=42040/without-remorse
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
