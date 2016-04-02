// action types
export const ADD_TO_CART = "ADD_TO_CART";
export const CLEAR_THE_CART = "CLEAR_THE_CART";
export const REMOVE_FROM_THE_CART = "REMOVE_FROM_THE_CART";

// action creators
export function addToCart(item) {
    return {
        type: ADD_TO_CART,
        item
    };
}

export function clearTheCart() {
    return { type: CLEAR_THE_CART };
}

export function removeFromTheCart(idx) {
    return {
        type: REMOVE_FROM_THE_CART,
        idx
    };
}
