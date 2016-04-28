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
import Cart from './app/components/Cart';
import NewDrawing from './app/components/admin/NewDrawing';
import ManageCategories from './app/components/admin/ManageCategories';
import ManageDrawings from './app/components/admin/ManageDrawings';
import MainLogin from './app/components/auth/MainLogin';
import MainSignUp from './app/components/auth/MainSignUp';
import Categories from './app/components/categories/Categories';
import Category from './app/components/categories/Category';
import SingleDrawing from './app/components/categories/SingleDrawing'


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
                <IndexRoute component={Categories}/>
                <Route path="/admin/new_drawing" component={NewDrawing} />
                <Route path="/admin/manage_categories" component={ManageCategories} />
                <Route path="/admin/manage_drawings" component={ManageDrawings} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" component={MainLogin} />
                <Route path="/signup" component={MainSignUp} />
                <Route path="/categories" component={Categories} >
                    <Route path=":categoryUrl" component={Category} />
                </Route>
                <Route path="/drawing/:id" component={SingleDrawing} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
