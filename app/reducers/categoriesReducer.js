// action types
import {
    START_FETCHING_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAIL
} from '../actions/categoriesActions';

const defaultCategoriesState = {
    isFetching: false,
    items: [],
    error: null
};

function categoriesReducer(
    state = defaultCategoriesState,
    action
) {
    switch (action.type) {
        case START_FETCHING_CATEGORIES:
            return Object.assign(
                {},
                defaultCategoriesState,
                { isFetching: true }
            );
        case FETCH_CATEGORIES_SUCCESS:
            return Object.assign(
                {},
                defaultCategoriesState,
                { items: action.items }
            );
        case FETCH_CATEGORIES_FAIL:
            return Object.assign(
                {},
                defaultCategoriesState,
                { error: action.error }
            );
        default:
            return defaultCategoriesState
        }
}

export default categoriesReducer;
