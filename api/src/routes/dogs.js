const { Sequelize } = require('sequelize');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const { API_KEY } = process.env;

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

traerTemps();

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
                        weight: { metric: el.weight },
                        height: { metric: el.height },
                        id: el.id,
                        name: el.name,
                        life_span: el.life_span,
                        temperament: el.Temperaments.map(el => el = el.name).join(', '),
                        image: { url: el.image }
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
