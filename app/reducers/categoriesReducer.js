// action types
import {
    START_FETCHING_CATEGORIES, FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAIL, START_ADDING_CATEGORY,
    ADD_CATEGORY_FAIL, START_DELETING_CATEGORY,
    DELETE_CATEGORY_FAIL, START_UPDATING_CATEGORY,
    UPDATE_CATEGORY_FAIL
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

        case START_UPDATING_CATEGORY:
        case START_DELETING_CATEGORY:
        case START_ADDING_CATEGORY:
        case START_FETCHING_CATEGORIES:
            return Object.assign(
                {},
                state,
                { isFetching: true }
            );

        case FETCH_CATEGORIES_SUCCESS:
            return Object.assign(
                {},
                defaultCategoriesState,
                { items: action.items }
            );

        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
        case ADD_CATEGORY_FAIL:
        case FETCH_CATEGORIES_FAIL:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                    isFetching: false
                }
            );

        default:
            return state;
        }
}

export default categoriesReducer;
