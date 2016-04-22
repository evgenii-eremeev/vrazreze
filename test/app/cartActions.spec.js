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


});
