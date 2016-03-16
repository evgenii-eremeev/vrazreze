// action types

export const FETCH_DRAWINGS = "FETCH_DRAWINGS";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_CATEGORY = "FETCH_CATEGORY";


// sync action creators
export function fetchDrawings(data) {
	return { type: FETCH_DRAWINGS, data }
}

export function fetchCategories(data) {
	return { type: FETCH_CATEGORIES, data }
}

export function fetchCategory(data) {
	return { type: FETCH_CATEGORY, data }
}

// async action creators
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
            return dispatch(fetchCategories(categories));
        });
    }
}

export function attemptFetchCategory(url) {
    return (dispatch) => {
        $.getJSON('api/category/' + url, function (category) {
			console.log('attemptFetchCategory...');
            dispatch(fetchCategory(category));
        });
    };
}
