import { GET_BREEDS, GET_BREEDS_BY_FILTER, GET_BREEDS_BY_TEMPS } from './actions-types.js';

export function getBreeds() {
    return function (dispatch) {
        return (
            fetch("http://localhost:3001/dogs")
                .then(res => res.json())
                .then(response => {
                    let respuesta = Object.values(response)
                    dispatch({ type: GET_BREEDS, payload: respuesta })
                })
        )
    }
}

export function getBreedsByFilter(id) {
    return function (dispatch) {
        return (fetch(`http://localhost:3001/dogs?name=${id}`)
            .then(res => res.json())
            .then(json => {
                dispatch({ type: GET_BREEDS_BY_FILTER, payload: json })
            })
        )
    }
}

export function getBreedsByTemps(data) {
    return function (dispatch) {
        return (fetch("http://localhost:3001/dogs")
            .then(res => res.json())
            .then(response => {
                let respuesta = Object.values(response)
                let final = []
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].temperament) if (respuesta[i].temperament.toLowerCase().includes(data.toLowerCase())) final.push(respuesta[i])
                }
                dispatch({ type: GET_BREEDS_BY_TEMPS, payload: final })
            })
        )
    }
}