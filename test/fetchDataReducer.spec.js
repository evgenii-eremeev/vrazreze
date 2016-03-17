import expect from 'expect';

import fetchDataReducer from '../app/reducers/fetchDataReducer';

describe('dataRuducer', function () {

    describe('FETCH_CATEGORIES', function () {
        it('should insert data from action', function () {
            const stateBefore = {
                categories: [],
                category: []
            };
            const stateAfter = {
                categories: [
                    {name: 'cat1'},
                    {name: 'cat2'}
                ],
                category: []
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
