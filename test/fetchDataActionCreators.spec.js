import expect from 'expect';

import fetchDataReducer from '../app/reducers/fetchDataReducer';
import {
    FETCH_DRAWINGS,
    FETCH_CATEGORIES,
    fetchDrawings,
    fetchCategories
} from '../app/actions/fetchDataActions';

describe('fetchDataActionCreators', function () {

    describe('FETCH_DRAWINGS', function () {
        it('should despatch action with action creator', function () {
            const stateBefore = {
                categories: [],
                drawings: []
            };
            const stateAfter = {
                categories: [],
                drawings: [
                    {name: 'drawing1'},
                    {name: 'drawing2'}
                ]
            };
            const action = fetchDrawings(
                [
                    {name: 'drawing1'},
                    {name: 'drawing2'}
                ]
            );
            expect(
                fetchDataReducer(stateBefore, action)
            ).toEqual(stateAfter)
        });
    });

    describe('FETCH_CATEGORIES', function () {
        it('should despatch action with action creator', function () {
            const stateBefore = {
                categories: [],
                drawings: []
            };
            const stateAfter = {
                categories: [
                    {name: 'cat1'},
                    {name: 'cat2'}
                ],
                drawings: []
            };
            const action = fetchCategories(
                [
                    {name: 'cat1'},
                    {name: 'cat2'}
                ]
            );
            expect(
                fetchDataReducer(stateBefore, action)
            ).toEqual(stateAfter)
        });
    });

});
