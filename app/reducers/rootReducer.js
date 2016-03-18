import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawingsReducer from './drawingsReducer';
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
    drawings: drawingsReducer,
    categories: categoriesReducer,
    routing: routerReducer
});

export default rootReducer;
