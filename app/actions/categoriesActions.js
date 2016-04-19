import fetch from 'isomorphic-fetch';

// action types
export const START_FETCHING_CATEGORIES = "START_FETCHING_CATEGORIES";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAIL";
export const START_ADDING_CATEGORY = "START_ADDING_CATEGORY";
export const ADD_CATEGORY_FAIL = "ADD_CATEGORY_FAIL";
export const START_DELETING_CATEGORY = "START_DELETING_CATEGORY";
export const DELETE_CATEGORY_FAIL = "DELETE_CATEGORY_FAIL";
export const START_UPDATING_CATEGORY = "START_UPDATING_CATEGORY";
export const UPDATE_CATEGORY_FAIL = "UPDATE_CATEGORY_FAIL";


// sync action creators
// fetching
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
// adding
export function startAddingCategory() {
	return {
		type: START_ADDING_CATEGORY,
		isFetching: true
	};
}

export function addCategoryFail(error) {
	return {
		type: ADD_CATEGORY_FAIL,
		error
	};
}
// deleting
export function startDeletingCategory() {
	return {
		type: START_DELETING_CATEGORY,
		isFetching: true
	};
}

export function deleteCategoryFail(error) {
	return {
		type: DELETE_CATEGORY_FAIL,
		error
	};
}
// updating
export function startUpdatingCategory() {
	return {
		type: START_UPDATING_CATEGORY,
		isFetching: true
	};
}

export function updateCategoryFail(error) {
	return {
		type: UPDATE_CATEGORY_FAIL,
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
			credentials : 'same-origin',
			method: 'POST',
			body: JSON.stringify({formData})
		})
		.then(response => response.ok)
		.then(() => dispatch(fetchCategories()))
		.catch(error => dispatch(
			addCategoryFail("Server error. Can't add category")
		));
	};
}

export function deleteCategory(categoryId) {
	return (dispatch) => {
		dispatch(startDeletingCategory());

		return fetch('/api/delete_category/' + categoryId, {
			method: 'DELETE',
			credentials : 'same-origin',
		})
		.then(response => response.ok)
		.then(() => dispatch(fetchCategories()))
		.catch(error => dispatch(
			addCategoryFail("Server error. Can't delete category")
		));
	};
}

export function updateCategory(categoryId, formData) {
	return (dispatch) => {
		dispatch(startUpdatingCategory());

		return fetch('/api/update_category/' + categoryId, {
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			credentials : 'same-origin',
			method: 'POST',
			body: JSON.stringify({formData})
		})
		.then(response => response.ok)
		.then(() => dispatch(fetchCategories()))
		.catch(error => dispatch(
			updateCategoryFail("Server error. Can't update category")
		))
	};
}
