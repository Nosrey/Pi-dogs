const axios = require('axios').default;
const CircularJSON = require('circular-json');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    axios.get("https://api.thedogapi.com/v1/breeds")
        // .then(res => res.json())
        .then(response => {
            let respuesta = Object.values(response.data).map(el => el = el.name)
            res.send(respuesta)
        })
})

router.get('/', (req, res) => {
    const { name } = req.query;
    axios.get("https://api.thedogapi.com/v1/breeds")
        // .then(res => res.json())
        .then(response => {
            let respuesta = Object.values(response.data).map(el => el = el.name)
            let final = respuesta.filter(el => el.name === name)
            res.send(final)
        })
})




module.exports = router;
