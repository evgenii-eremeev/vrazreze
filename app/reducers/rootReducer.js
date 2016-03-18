import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawingsReducer from './drawingsReducer';

const rootReducer = combineReducers({
    drawings: drawingsReducer,
    routing: routerReducer
});

export default rootReducer;
