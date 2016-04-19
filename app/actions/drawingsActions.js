import fetch from 'isomorphic-fetch';

// action types
export const START_FETCHING_DRAWINGS = "START_FETCHING_DRAWINGS";
export const FETCH_DRAWINGS_SUCCESS = "FETCH_DRAWINGS_SUCCESS";
export const FETCH_DRAWINGS_FAIL = "FETCH_DRAWINGS_FAIL";
export const START_DELETING_DRAWING = "START_DELETING_DRAWING";
export const DELETE_DRAWING_FAIL = "DELETE_DRAWING_FAIL";

// sync action creators
// fetching
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

// deleting
export function startDeletingDrawing() {
	return {
		type: START_DELETING_DRAWING,
		isFetching: true
	};
}

export function deleteDrawingFail(error) {
	return {
		type: DELETE_DRAWING_FAIL,
		error
	};
}


// async action creators
export function fetchDrawings(categoryUrl) {
    return (dispatch) => {
		dispatch(startFetchingDrawings());
		return fetch('/api/category/' + categoryUrl)
			.then(response => response.json())
			.then(json => dispatch(
				fetchDrawingsSuccess(categoryUrl, json)
			))
			.catch(error => dispatch(
				fetchDrawingsFail("Ошибка при загрузке чертежей")
			));
    };
}

export function deleteDrawing(drawingId, categoryUrl) {
	return (dispatch) => {
		dispatch(startDeletingDrawing());
		return fetch('/api/delete_drawing/' + drawingId, {
			method: 'DELETE',
			credentials : 'same-origin',
		})
		.then(response => response.ok)
		.then(() => dispatch(
			fetchDrawings(categoryUrl)
		))
		.catch(error => dispatch(
			deleteDrawingFail("Server error. Can't delete drawing")
		));
	};
}
