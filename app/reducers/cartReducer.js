import {
    ADD_TO_CART, CLEAR_THE_CART, REMOVE_FROM_THE_CART
} from '../actions/cartActions';

function cartReducer(state = [], action) {
    switch (action.type) {

        case ADD_TO_CART:
            return [...state, action.item]

        case CLEAR_THE_CART:
            return [];

        case REMOVE_FROM_THE_CART:
            return [
                ...state.slice(0, action.idx),
                ...state.slice(action.idx + 1)
            ];

        default:
            return state;
    }
}

export default cartReducer;
