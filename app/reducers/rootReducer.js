import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import fetchDataReducer from './fetchDataReducer';

const rootReducer = combineReducers({
    dataReducer,
    routing: routerReducer
});

export default rootReducer;
