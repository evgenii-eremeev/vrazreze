import expect from 'expect';

import fetchDataReducer from '../app/reducers/fetchDataReducer';

describe('dataRuducer', function () {

    describe('default', function () {
        it('should return default state', function () {
            const stateBefore = undefined;
            const stateAfter = {
                categories: [],
                drawings: []
            };
            expect(
                fetchDataReducer(stateBefore, {})
            ).toEqual(stateAfter);
        });
    });

    describe('FETCH_DRAWINGS', function () {
        it('should insert data from action', function () {
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
            const action = {
                type: 'FETCH_DRAWINGS',
                data: [
                    {name: 'drawing1'},
                    {name: 'drawing2'}
                ]
            };
            expect(
                fetchDataReducer(stateBefore, action)
            ).toEqual(stateAfter)
        });
    });

    describe('FETCH_CATEGORIES', function () {
        it('should insert data from action', function () {
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
            const action = {
                type: 'FETCH_CATEGORIES',
                data: [
                    {name: 'cat1'},
                    {name: 'cat2'}
                ]
            };
            expect(
                fetchDataReducer(stateBefore, action)
            ).toEqual(stateAfter)
        });
    });


}); // end dataReduces
