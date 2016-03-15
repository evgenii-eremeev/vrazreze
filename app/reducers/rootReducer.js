import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    dataReducer,
    routing: routerReducer
});

export default rootReducer;
