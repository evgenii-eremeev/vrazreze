// action types
import { FETCH_DRAWINGS, FETCH_CATEGORIES } from '../actions/fetchDataActions';

const defaultStartState = {
    categories: [],
    drawings: []
};

function fetchDataReducer (state = defaultStartState, action) {
    switch (action.type) {
        case FETCH_DRAWINGS:
            return Object.assign({}, state, { drawings: action.data });
        case FETCH_CATEGORIES:
            return Object.assign({}, state, { categories: action.data });
        default:
            return state;
    }
}

export default fetchDataReducer;
