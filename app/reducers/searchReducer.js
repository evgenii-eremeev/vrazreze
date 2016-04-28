// action types
import {
    START_SEARCH, SEARCH_SUCCESS, SEARCH_FAIL
} from '../actions/searchActions.js';

const defaultState = {
    isSearching: false,
    results: [],
    error: null
};

function searchReducer(
    state = defaultState,
    action
) {
    switch (action.type) {

        case START_SEARCH:
            return Object.assign(
                {},
                state,
                { isSearching: true }
            );

        case SEARCH_SUCCESS:
            return Object.assign(
                {},
                defaultState,
                { results: action.results }
            );

        case SEARCH_FAIL:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                    isSearching: false,
                }
            );

        default:
            return state;
        }
}

export default searchReducer;
