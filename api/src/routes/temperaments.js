const axios = require('axios').default;
require('dotenv').config();
const { Router } = require('express');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const config = {
    headers: {
        header1: API_KEY,
    }
};


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
    await axios.get("https://api.thedogapi.com/v1/breeds", config)
        .then(response => {
            let arrayFinal = []
            Object.values(response.data).map(el => {
                if (el.temperament) {
                    el = el.temperament.split(',').map(el => arrayFinal.push(el))
                } else return el = null;
            })
            arrayFinal = [...new Set(arrayFinal)];
            res.send(arrayFinal)
        })
})

module.exports = router;
