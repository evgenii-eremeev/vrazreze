// action types
import {
    START_FETCHING_DRAWINGS, FETCH_DRAWINGS_SUCCESS, FETCH_DRAWINGS_FAIL,
    START_DELETING_DRAWING, DELETE_DRAWING_FAIL
} from '../actions/drawingsActions';

const defaultDrawingsState = {
    isFetching: false,
    items: [],
    categoryUrl: '',
    error: null
};

function drawingsReducer(
    state = defaultDrawingsState,
    action
) {
    switch (action.type) {

        case START_DELETING_DRAWING:
        case START_FETCHING_DRAWINGS:
            return Object.assign(
                {},
                state,
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

        case DELETE_DRAWING_FAIL:
        case FETCH_DRAWINGS_FAIL:
            return Object.assign(
                {},
                state,
                { error: action.error }
            );

        default:
            return state;
        }
}

export default drawingsReducer;
