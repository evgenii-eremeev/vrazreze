import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawingsReducer from './drawingsReducer';
import categoriesReducer from './categoriesReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import lightboxReducer from './lightboxReducer';
import singleDrawingReducer from './singleDrawingReducer';

const rootReducer = combineReducers({
    drawings: drawingsReducer,
    categories: categoriesReducer,
    userAuthSession: authReducer,
    cart: cartReducer,
    lightbox: lightboxReducer,
    routing: routerReducer,
    singleDrawing: singleDrawingReducer
});

export default rootReducer;
