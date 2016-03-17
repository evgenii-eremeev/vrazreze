import fetch from 'isomorphic-fetch';
// action types

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_CATEGORY = "FETCH_CATEGORY";

// sync action creators
export function fetchCategories(data) {
	return { type: FETCH_CATEGORIES, data }
}

export function fetchCategory(data) {
	return { type: FETCH_CATEGORY, data }
}

// async action creators
export function attemptFetchCategories() {
    return (dispatch) => {
		return fetch('/api/categories')
			.then(response => response.json())
			.then(json => dispatch(fetchCategories(json)));
    };
}

export function attemptFetchCategory(categoryUrl) {
    return (dispatch) => {
		return fetch('/api/category/' + categoryUrl)
			.then(response => response.json())
			.then(json => dispatch(fetchCategory(json)));
    };
}
