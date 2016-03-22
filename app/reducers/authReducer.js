import {  CLICKED_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL,
          CLICKED_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
          STARTED_SESSION_CHECK, CHECKED_SESSION_STATUS,
          CLICKED_LOGOUT, LOGOUT_SUCCESS,
          NAVIGATE_AWAY_FROM_AUTH_FORM } from '../actions/authActions';

const defaultStartState = {
    isLoggedIn: false,
    fetchingAuthUpdate: false,
    userObject: null,
    error: null
};

function authReducer(userAuthState = defaultStartState , action) {
    switch (action.type) {

        case STARTED_SESSION_CHECK:
        case CLICKED_LOGIN:
        case CLICKED_SIGNUP:
        case CLICKED_LOGOUT:
            return Object.assign({}, userAuthState, {
                fetchingAuthUpdate: true,
                error: null
            });

        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return Object.assign({}, userAuthState, {
                isLoggedIn: true,
                fetchingAuthUpdate: false,
                userObject: action.userObject,
                error: null
            });

        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return Object.assign({}, userAuthState, {
                isLoggedIn: false,
                fetchingAuthUpdate: false,
                error: action.error
            });

        case CHECKED_SESSION_STATUS:
            if (action.result.isLoggedIn){
                return Object.assign({}, userAuthState, {
                    isLoggedIn: true,
                    fetchingAuthUpdate: false,
                    userObject: action.result.userObject,
                    error: null
                });
            }
            // set to default conditions
            // (ignore errors and let login/signup handle server errors)
            return  Object.assign({}, defaultStartState);

        case LOGOUT_SUCCESS:
            return Object.assign({}, defaultStartState);

        case NAVIGATE_AWAY_FROM_AUTH_FORM:
            return Object.assign({}, userAuthState, {
                error: null
            });

        default:
            return userAuthState;
    }
}

export default authReducer;
