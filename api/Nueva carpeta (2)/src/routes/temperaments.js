const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
const { Router } = require('express');

const router = Router();

const optionsGet = {
    method: 'GET',
    headers: {
        'x-api-key': "live_zSJDtLlxVLa5KBL2eo2Ev7PlmuiI9J01AwUrfeSCIMYAYJNRw5HaRSaUmlHZrqv4",
    }
};
    
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

module.exports = router;
