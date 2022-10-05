const axios = require('axios').default;
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
const { Router } = require('express');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const optionsGet = {
    method: 'GET',
    headers: {
        'x-api-key': API_KEY,
    }
};


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
    
router.get('/', async (req, res) => {
    try {
        await fetch("https://api.thedogapi.com/v1/breeds", optionsGet)
            .then(res => res.json())
            .then(response => {
                let arrayFinal = []
                Object.values(response).map(el => {
                    if (el.temperament) {
                        el = el.temperament.split(',').map(el => {if (el[0] === ' ') {el = el.slice(1)}; arrayFinal.push(el)})
                    } else return el = null;
                })
                arrayFinal = [...new Set(arrayFinal)];
                res.send(arrayFinal)
            })
    }
    catch {
        return null
    }
})
// router.get('/', async (req, res) => {
//     await axios.get("https://api.thedogapi.com/v1/breeds", config)
//         .then(response => {
//             let arrayFinal = []
//             Object.values(response.data).map(el => {
//                 if (el.temperament) {
//                     el = el.temperament.split(',').map(el => arrayFinal.push(el))
//                 } else return el = null;
//             })
//             arrayFinal = [...new Set(arrayFinal)];
//             res.send(arrayFinal)
//         })
// })

module.exports = router;
