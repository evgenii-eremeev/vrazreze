import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawingsReducer from './drawingsReducer';
import categoriesReducer from './categoriesReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import lightboxReducer from './lightboxReducer';
import singleDrawingReducer from './singleDrawingReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
    drawings: drawingsReducer,
    categories: categoriesReducer,
    searchData: searchReducer,
    userAuthSession: authReducer,
    cart: cartReducer,
    lightbox: lightboxReducer,
    routing: routerReducer,
    singleDrawing: singleDrawingReducer
});

export default rootReducer;
