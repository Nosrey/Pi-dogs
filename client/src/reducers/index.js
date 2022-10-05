import { GET_BREEDS, GET_BREEDS_BY_FILTER, GET_BREEDS_BY_TEMPS } from '../actions/actions-types.js';

const initialState = {
    breeds: [],
    breeds_filtereds: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload
            }

        case GET_BREEDS_BY_FILTER:
            return {
                ...state,
                breeds_filtereds: action.payload
            }
        case GET_BREEDS_BY_TEMPS:
            return {
                ...state,
                breeds_filtereds: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;