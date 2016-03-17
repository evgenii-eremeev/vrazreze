// action types
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY
} from '../actions/fetchDataActions';

const defaultStartState = {
    categories: [],
    category: []
};

function fetchDataReducer (state = defaultStartState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return Object.assign({}, state, { categories: action.data });
        case FETCH_CATEGORY:
            return Object.assign({}, state, { category: action.data });
        default:
            return state;
    }
}

export default fetchDataReducer;
