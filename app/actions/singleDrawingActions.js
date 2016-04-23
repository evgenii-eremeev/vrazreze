import fetch from 'isomorphic-fetch';

// action types
export const START_FETCHING_SINGLE_DRAWING = "START_FETCHING_SINGLE_DRAWING";
export const FETCH_SINGLE_DRAWING_SUCCESS = "FETCH_SINGLE_DRAWING_SUCCESS";
export const FETCH_SINGLE_DRAWING_FAIL = "FETCH_SINGLE_DRAWING_FAIL";

// sync action creators
// fetching
export function startFetchingSingleDrawing() {
	return {
		type: START_FETCHING_SINGLE_DRAWING,
		isFetching: true
	};
}

export function fetchSingleDrawingSuccess(drawing) {
	return {
		type: FETCH_SINGLE_DRAWING_SUCCESS,
		drawing
	};
}

export function fetchSingleDrawingFail(error) {
	return {
		type: FETCH_SINGLE_DRAWING_FAIL,
		error
	};
}

// async action creators
export function fetchSingleDrawing(id) {
    return (dispatch) => {
		dispatch(startFetchingSingleDrawing());
		return fetch('/api/drawing/' + id)
			.then(response => response.json())
			.then(json => dispatch(
				fetchSingleDrawingSuccess(json)
			))
			.catch(error => dispatch(
				fetchSingleDrawingFail("Ошибка при загрузке чертежа")
			));
    };
}
