import expect from 'expect';
import deepFreeze from 'deep-freeze';


import searchReducer from '../../app/reducers/searchReducer';
import {
    startSearch,
    searchSuccess,
    searchFail
} from '../../app/actions/searchActions';

describe('searchReducer', function () {

    it('does return default value', function () {
        const stateBefore = undefined;
        const stateAfter = {
            isSearching: false,
            results: [],
            error: null
        };
        const action = {};

        expect(
            searchReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does return correct state according startSearch action', function () {
        const stateBefore = {
            isSearching: false,
            results: [],
            error: null
        };
        const stateAfter = {
            isSearching: true,
            results: [],
            error: null
        };
        const action = startSearch();
        deepFreeze(stateBefore);

        expect(
            searchReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does return correct state according searchSuccess action', function () {
        const stateBefore = {
            isSearching: true,
            results: [],
            error: null
        };
        const stateAfter = {
            isSearching: false,
            results: [{a: 1}, {a: 2}, {a: 3}],
            error: null
        };
        const action = searchSuccess([{a: 1}, {a: 2}, {a: 3}]);
        deepFreeze(stateBefore);

        expect(
            searchReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does return fresh results', function () {
        const stateBefore = {
            isSearching: false,
            results: [{a: 1}, {a: 2}, {a: 3}],
            error: null
        };
        const stateAfter = {
            isSearching: false,
            results: [{b: 1}, {b: 2}, {b: 3}],
            error: null
        };
        const action = searchSuccess([{b: 1}, {b: 2}, {b: 3}]);
        deepFreeze(stateBefore);

        expect(
            searchReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does return correct state according searchFail action', function () {
        const stateBefore = {
            isSearching: true,
            results: [],
            error: null
        };
        const stateAfter = {
            isSearching: false,
            results: [],
            error: "Error message"
        };
        const action = searchFail("Error message");
        deepFreeze(stateBefore);

        expect(
            searchReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

});
