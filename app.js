// React + React Router
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Redux
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

// Reducers
import rootReducer from './app/reducers/rootReducer';

// Components
import App from './app/components/App';
import Home from './app/components/Home';
import NewDrawing from './app/components/NewDrawing';
import Login from './app/components/Login';
import Register from './app/components/Register';
import Categories from './app/components/categories/Categories';
import Category from './app/components/categories/Category';

// Set up store
const routeMiddleware = routerMiddleware(browserHistory)
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    routeMiddleware
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="new_drawing" component={NewDrawing} />
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
                <Route path="categories" component={Categories} >
                    <Route path="/categories/:categoryUrl" component={Category} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
