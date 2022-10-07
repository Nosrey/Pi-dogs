const axios = require('axios').default;
const { Sequelize } = require('sequelize');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
const CircularJSON = require('circular-json');
const { Router } = require('express');
const { Dog, Temperament } = require('../db')
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


// para añadir todos los temperamentos de la api a mi DataBase
async function traerTemps() {
    try {
        await fetch("https://api.thedogapi.com/v1/breeds", optionsGet)
            .then(res => res.json())
            .then(response => {
                let arrayFinal = []
                Object.values(response).map(el => {
                    if (el.temperament) {
                        el = el.temperament.split(',').map(el => { if (el[0] === ' ') { el = el.slice(1) }; arrayFinal.push(el) })
                    } else return el = null;
                })
                arrayFinal = [...new Set(arrayFinal)];
                return arrayFinal.map(async el => await Temperament.create({ name: el }))
            })
    }
    catch {
        return null
    }
}
// async function traerTemps() {
//     await axios.get("https://api.thedogapi.com/v1/breeds", config)
//         .then(response => {
//             let arrayFinal = []
//             Object.values(response.data).map(el => {
//                 if (el.temperament) {
//                     el = el.temperament.split(',').map(el => arrayFinal.push(el))
//                 } else return el = null;
//             })
//             arrayFinal = [...new Set(arrayFinal)];
//             return arrayFinal.map(async el => await Temperament.create({ nombre: el }))
//         })
//         .catch(err => console.log(err))
// }

traerTemps();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        await fetch("https://api.thedogapi.com/v1/breeds", optionsGet)
            .then(res => res.json())
            .then(async response => {
                let respuesta = Object.values(response)
                for (let i = 0; i < respuesta.length; i++) {
                    respuesta[i].id += 1000
                }
                let puppies = await Dog.findAll({ include: Temperament });
                Object.values(puppies).map(el => {
                    let fixed = {
                        weight: {metric: el.weight},
                        height: {metric: el.height},
                        id: el.id,
                        name: el.name,
                        life_span: el.life_span,
                        temperament: el.Temperaments.map(el => el = el.name).join(', '),
                        image: {url: el.image}
                    }
                    respuesta.push(fixed)
                })
                let final = [];
                if (name) {
                    for (let i = 0; i < respuesta.length; i++) {
                        if (respuesta[i].name.toLowerCase().includes(name.toLowerCase())) final.push(respuesta[i])
                    }
                }
                if (name) res.send(final)
                else res.send(respuesta)
            })
    }
    catch {
        return null
    }
})
// router.get('/', async (req, res) => {
//     const { name } = req.query;
//     await axios.get("https://api.thedogapi.com/v1/breeds", config)
//         .then(response => {
//             let respuesta = Object.values(response.data).map(el => el = el.name)
//             let final = [];
//             if (name) {
//                 for (let i = 0; i < respuesta.length; i++) {
//                     if (respuesta[i].toLowerCase().includes(name.toLowerCase())) final.push(respuesta[i])
//                 }
//             }
//             if (name) res.send(final)
//             else res.send(respuesta)
//         })
// })

router.get('/prueba', async (req, res) => {
    try {
        const users = await Dog.findAll({ include: Temperament });

        res.send(users)
    } catch {
        return null
    }
})

router.get('/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params;
        await fetch("https://api.thedogapi.com/v1/breeds", optionsGet)
            .then(res => res.json())
            .then(response => {
                let respuesta = Object.values(response)
                res.send(respuesta[idRaza - 1])
            })
    }
    catch {
        return null
    }
})
// router.get('/:idRaza', async (req, res) => {
//     const { idRaza } = req.params;
//     await axios.get("https://api.thedogapi.com/v1/breeds", config)
//         .then(response => {
//             let respuesta = Object.values(response.data)
//             res.send(respuesta[idRaza - 1])
//         })
// })

router.post('/', async (req, res) => {
    const { name, height, weight, life, temperaments, image } = req.body

    if (!name || !height || !weight || !life || !temperaments || !image) return res.status(404).send('faltan datos por proveer')
    const dog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        life_span: life,
        image: image,
    })

    temperaments.map(async el => {
        let tempEl = await Temperament.findByPk(el + 1)
        dog.addTemperament(tempEl, { through: 'Dog_Temperament' })
    })

    return res.json(dog)
})

module.exports = router;
