import expect from 'expect';
import deepFreeze from 'deep-freeze';

import cartReducer from '../../app/reducers/cartReducer';
import {
    addToCart, clearTheCart, removeFromTheCart
} from '../../app/actions/cartActions';

describe('cartActions', function () {

    it('does return default value', function () {
        const stateBefore = undefined;
        const stateAfter = [];
        const action = {};

        expect(
            cartReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does add to cart item', function () {
        const stateBefore = [];
        const stateAfter = [{a: 1, b: 2}];
        const action = addToCart({a: 1, b: 2});
        deepFreeze(stateBefore);

        expect(
            cartReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does clear the cart', function () {
        const stateBefore = [{a: 1, b: 2}];
        const stateAfter = [];
        const action = clearTheCart();
        deepFreeze(stateBefore);

        expect(
            cartReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does remove from the cart', function () {
        const stateBefore = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}];
        const stateAfter = [{a: 1}, {b: 2}, {d: 4}, {e: 5}];
        const action = removeFromTheCart(2);
        deepFreeze(stateBefore);

        expect(
            cartReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

});
