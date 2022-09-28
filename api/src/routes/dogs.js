const axios = require('axios').default;
require('dotenv').config();
const CircularJSON = require('circular-json');
const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const config = {
    headers: {
        header1: API_KEY,
    }
};


// para añadir todos los temperamentos de la api a mi DataBase

axios.get("https://api.thedogapi.com/v1/breeds", config)
    .then(response => {
        let arrayFinal = []
        Object.values(response.data).map(el => {
            if (el.temperament) {
                el = el.temperament.split(',').map(el => arrayFinal.push(el))
            } else return el = null;
        })
        arrayFinal = [...new Set(arrayFinal)];
        return arrayFinal.map(async el => await Temperament.create({ nombre: el }))
    })
    .catch(err => console.log(err))

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    const { name } = req.query;
    axios.get("https://api.thedogapi.com/v1/breeds", config)
        .then(response => {
            let respuesta = Object.values(response.data).map(el => el = el.name)
            let final = [];
            if (name) {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].toLowerCase().includes(name.toLowerCase())) final.push(respuesta[i])
                }
            }
            if (name) res.send(final)
            else res.send(respuesta)
        })
})

router.get('/:idRaza', (req, res) => {
    const { idRaza } = req.params;
    axios.get("https://api.thedogapi.com/v1/breeds", config)
        .then(response => {
            let respuesta = Object.values(response.data)
            res.send(respuesta[idRaza - 1])
        })
})

router.post('/', async (req, res) => {
    const { nombre_raza, altura_raza, peso_raza, años_de_vida_raza, nombre_temp } = req.body

    if (!nombre_raza || !altura_raza || !peso_raza) return res.status(404).send('faltan datos por proveer')
    const dog = await Dog.create({
        nombre: nombre_raza,
        altura: altura_raza,
        peso: peso_raza,
        años_de_vida: años_de_vida_raza,
    })

    nombre_temp.map(async el => {
        let tempEl = await Temperament.findByPk(el)
        dog.addTemperament(tempEl, { through: 'Dog_Temperament' })
    })

    return res.json(dog)
})

module.exports = router;