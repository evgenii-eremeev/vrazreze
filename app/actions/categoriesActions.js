import fetch from 'isomorphic-fetch';

// action types
export const START_FETCHING_CATEGORIES = "START_FETCHING_CATEGORIES";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAIL";

// sync action creators
export function startFetchingCategories() {
	return {
		type: START_FETCHING_CATEGORIES,
		isFetching: true
	};
}

export function fetchCategoriesSuccess(items) {
	return {
		type: FETCH_CATEGORIES_SUCCESS,
		items
	};
}

export function fetchCategoriesFail(error) {
	return {
		type: FETCH_CATEGORIES_FAIL,
		error
	};
}

// async action creators
export function fetchCategories() {
    return (dispatch) => {
        dispatch(startFetchingCategories());
		return fetch('/api/categories')
			.then(response => response.json())
			.then(json => dispatch(fetchCategoriesSuccess(json)))
            .catch(error => dispatch(
                fetchCategoriesFail("Error fetching categories...")
            ));
    };
}
