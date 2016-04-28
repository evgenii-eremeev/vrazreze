import fetch from 'isomorphic-fetch';

// action types
export const START_SEARCH = "START_SEARCH";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAIL = "SEARCH_FAIL";

// sync action creators
// searching
export function startSearch() {
	return {
		type: START_SEARCH,
		isSearching: true
	};
}

export function searchSuccess(results) {
	return {
		type: SEARCH_SUCCESS,
		results
	};
}

export function searchFail(error) {
	return {
		type: SEARCH_FAIL,
		error
	};
}


// async action creators
export function search(query) {
    return (dispatch) => {
		dispatch(startSearch());
		return fetch('/api/search/?=' + query)
			.then(response => response.json())
			.then(json => dispatch(
				searchSuccess(query, json)
			))
			.catch(error => dispatch(
				searchFail("Ошибка при поиске")
			));
    };
}
