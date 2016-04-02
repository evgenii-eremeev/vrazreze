import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawingsReducer from './drawingsReducer';
import categoriesReducer from './categoriesReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    drawings: drawingsReducer,
    categories: categoriesReducer,
    userAuthSession: authReducer,
    cart: cartReducer,
    routing: routerReducer
});

export default rootReducer;
