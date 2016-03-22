import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawingsReducer from './drawingsReducer';
import categoriesReducer from './categoriesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    drawings: drawingsReducer,
    categories: categoriesReducer,
    userAuthSession: authReducer,
    routing: routerReducer
});

export default rootReducer;
