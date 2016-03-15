// action types

export const FETCH_DRAWINGS = "FETCH_DRAWINGS";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";


// action creators
export function fetchDrawings(data) {
	return { type: FETCH_DRAWINGS, data }
}

export function fetchCategories(data) {
	return { type: FETCH_CATEGORIES, data }
}

export function attemptFetchDrawings() {
    return (dispatch) => {
        $.getJSON('api/drawings', function (drawings) {
            dispatch(fetchDrawings(drawings));
        });
    }
}

export function attemptFetchCategories() {
    return (dispatch) => {
        $.getJSON('api/categories', function (categories) {
            dispatch(fetchCategories(categories));
        });
    }
}
