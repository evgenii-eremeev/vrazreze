import fetch from 'isomorphic-fetch';

// action types
const START_FETCHING_DRAWINGS = "START_FETCHING_DRAWINGS";
const FETCH_DRAWINGS_SUCCESS = "FETCH_DRAWINGS_SUCCESS";
const FETCH_DRAWINGS_FAIL = "FETCH_DRAWINGS_FAIL";

// sync action creators
export function startFetchingDrawings() {
	return {
		type: START_FETCHING_DRAWINGS,
		isFetching: true
	};
}

export function fetchDrawingsSuccess(categoryUrl, items) {
	return {
		type: FETCH_DRAWINGS_SUCCESS,
		categoryUrl,
		items
	};
}

export function fetchDrawingsFail(error) {
	return {
		type: FETCH_DRAWINGS_FAIL,
		error
	};
}

// async action creators
export function attemptFetchCategory(categoryUrl) {
    return (dispatch) => {
		dispatch(startFetchingDrawings());
		return fetch('/api/category/' + categoryUrl)
			.then(response => response.json())
			.then(json => dispatch(
				fetchDrawingsSuccess(categoryUrl, json))
			)
			.catch(error => dispatch(
				fetchDrawingsFail("Can't load drowings, retry")
			);
    };
}


// export function attemptFetchCategories() {
//     return (dispatch) => {
// 		return fetch('/api/categories')
// 			.then(response => response.json())
// 			.then(json => dispatch(fetchCategories(json)));
//     };
// }
