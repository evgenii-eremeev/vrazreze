// action types
import {
    START_FETCHING_DRAWINGS,
    FETCH_DRAWINGS_SUCCESS,
    FETCH_DRAWINGS_FAIL
} from '../actions/drawingsActions';

const defaultDrawingsState = {
    isFetching: false,
    items: [],
    categoryUrl: '',
    error: null
}

function drawingsReducer(
    state = defaultDrawingsState,
    action
) {
    switch (action.type) {
        case START_FETCHING_DRAWINGS:
            return Object.assign(
                {},
                defaultDrawingsState,
                { isFetching: true }
            );
        case FETCH_DRAWINGS_SUCCESS:
            return Object.assign(
                {},
                defaultDrawingsState,
                {
                    items: action.items,
                    categoryUrl: action.categoryUrl
                }
            );
        case FETCH_DRAWINGS_FAIL:
            return Object.assign(
                {},
                defaultDrawingsState,
                { error: action.error }
            );
        default:
            return defaultDrawingsState
        }
}

export default drawingsReducer;
