import fetch from 'isomorphic-fetch';

// action types
export const START_FETCHING_CATEGORIES = "START_FETCHING_CATEGORIES";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAIL";
export const START_ADDING_CATEGORY = "START_ADDING_CATEGORY";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_FAIL";
export const ADD_CATEGORY_FAIL = "ADD_CATEGORY_FAIL";


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

export function startAddingCategory() {
	return {
		type: START_ADDING_CATEGORY,
		isFetching: true
	};
}

export function addCategorySuccess(items) {
	return {
		type: ADD_CATEGORY_SUCCESS,
		items
	};
}

export function addCategoryFail(error) {
	return {
		type: ADD_CATEGORY_FAIL,
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

export function addCategory(formData) {
	return (dispatch) => {
		dispatch(startAddingCategory());

		return fetch('/api/add_category', {
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(formData)
		})
		.then(response => response.json())
		.then(json => dispatch(fetchCategories()))
		.catch(error => dispatch(
			addCategoryFail("Server error. Can't add category")
		));
	};
}
