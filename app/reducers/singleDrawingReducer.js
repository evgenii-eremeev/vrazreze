// action types
import {
    START_FETCHING_SINGLE_DRAWING,
    FETCH_SINGLE_DRAWING_SUCCESS,
    FETCH_SINGLE_DRAWING_FAIL
} from '../actions/singleDrawingActions.js';

const defaultState = {
    isFetching: false,
    drawing: {},
    error: null
};

function singleDrawingReducer(state = defaultState, action) {
    switch (action.type) {

        case START_FETCHING_SINGLE_DRAWING:
            return Object.assign(
                {},
                state,
                { isFetching: true }
            );

        case FETCH_SINGLE_DRAWING_SUCCESS:
            return Object.assign(
                {},
                defaultState,
                { drawing: action.drawing }
            );

        case FETCH_SINGLE_DRAWING_FAIL:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                    isFetching: false,
                }
            );

        default:
            return state;
    }
}

export default singleDrawingReducer;
