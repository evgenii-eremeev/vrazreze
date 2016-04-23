import expect from 'expect';
import deepFreeze from 'deep-freeze';

import singleDrawingReducer from '../../app/reducers/singleDrawingReducer';
import {
    startFetchingSingleDrawing,
    fetchSingleDrawingSuccess,
    fetchSingleDrawingFail
} from '../../app/actions/singleDrawingActions.js';

describe('singleDrawingReducer', function () {

    it('does return default value', function () {
        const stateBefore = undefined;
        const stateAfter = {
            isFetching: false,
            drawing: {},
            error: null
        };
        const action = {};

        expect(
            singleDrawingReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('action startFetchingSingleDrawing', function () {
        const stateBefore = {
            isFetching: false,
            drawing: {},
            error: null
        };
        const stateAfter = {
            isFetching: true,
            drawing: {},
            error: null
        };
        const action = startFetchingSingleDrawing()

        expect(
            singleDrawingReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it("action fetchSingleDrawingSuccess", function () {
        const stateBefore = {
            isFetching: false,
            drawing: {},
            error: null
        };
        const stateAfter = {
            isFetching: false,
            drawing: {
                _id: 123,
                title: "Some title",
                description: "Good long description",
                price: 200,
                tags: ['one', 'two']
            },
            error: null
        };

        const action = fetchSingleDrawingSuccess({
            _id: 123,
            title: "Some title",
            description: "Good long description",
            price: 200,
            tags: ['one', 'two']
        });
        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(
            singleDrawingReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

});
