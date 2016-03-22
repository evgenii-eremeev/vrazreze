/*
 * action types
 */

export const CLICKED_SIGNUP = 'CLICKED_SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const CLICKED_LOGIN = 'CLICKED_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const STARTED_SESSION_CHECK = 'STARTED_SESSION_CHECK';
export const CHECKED_SESSION_STATUS = 'CHECKED_SESSION_STATUS';

export const CLICKED_LOGOUT = 'CLICKED_LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const NAVIGATE_AWAY_FROM_AUTH_FORM = 'NAVIGATE_AWAY_FROM_AUTH_FORM';

/*
 * other constants
 */


/*
 * action creators
 */

export function clickedSignUp() {
	return { type: CLICKED_SIGNUP }
}

export function signUpSuccess(userObject) {
	return { type: SIGNUP_SUCCESS, userObject };
}

export function signUpFail(error) {
	return { type: SIGNUP_FAIL, error };
}

export function attemptSignUp(email, password, displayName) {
  return (dispatch) => {
    dispatch(clickedSignUp());

    $.ajax({
			type: 'POST',
			url: '/signup',
			data: {email, password, displayName} })
			.done(function(data) {
				if (data.error){
					dispatch(signUpFail(data.error));
				} else {
					dispatch(signUpSuccess(data));
				}
			})
			.fail(function(a,b,c,d) {
			  // console.log('failed to signup',a,b,c,d);
			  dispatch(signUpFail("TODO find the error..."));
			});
  }
}


export function clickedLogin() {
	return { type: CLICKED_LOGIN };
}

export function loginSuccess(userObject) {
	return { type: LOGIN_SUCCESS, userObject };
}

export function loginFail(error) {
	return { type: LOGIN_FAIL, error };
}


export function attemptLogin(email, password) {
  return (dispatch) => {
        dispatch(clickedLogin());

        $.ajax({
            type: 'POST',
            url: '/login',
            data: {username: email, password}
        })
    	.done(function(data) {
    		if (data.error){
    			dispatch(loginFail(data.error));
    		} else {
    			dispatch(loginSuccess(data));
    		}
    	})
    	.fail(function(data) {
            if (data.responseText === "Unauthorized") {
                dispatch(loginFail("Не удалось войти, проверьте e-mail и пароль"));
            } else {
                dispatch(loginFail("Что-то пошло не так, попробуйте снова"));
            }
    	});
    }
}


export function startedSessionCheck() {
	return { type: STARTED_SESSION_CHECK };
}

export function checkedSessionStatus(result) {
	return { type: CHECKED_SESSION_STATUS, result };
}

export function checkSessionStatus(email, password) {
  return (dispatch) => {
    dispatch(startedSessionCheck());

    $.ajax({
			type: 'POST',
			url: '/checkSession',
			data: {} })
			.done(function(result) {
				dispatch(checkedSessionStatus(result));
			})
			.fail(function(a,b,c,d) {
			  // console.log('failed to check',a,b,c,d);
			  dispatch(checkedSessionStatus("TODO find the error..."));
			});
  }
}


export function clickedLogout() {
	return { type: CLICKED_LOGOUT };
}

export function logoutSuccess() {
	return { type: LOGOUT_SUCCESS };
}

export function attemptLogout(){
  return (dispatch) => {
    dispatch(clickedLogout());

    $.ajax({
	      type: 'POST',
	      url: '/logout'})
			  .done(function() {
					dispatch(logoutSuccess());
			  })
			  .fail(function() {
			  	// Not the redux way, but I think it's fair enough.
			    alert("Can't log you out at the moment. Try again in a bit");
			  });
  }
}


export function navigatedAwayFromAuthFormPage() {
	return { type: NAVIGATE_AWAY_FROM_AUTH_FORM }
}
