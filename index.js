import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import components
import App from './app/components/App';
import Home from './app/components/Home';
import NewDrawing from './app/components/NewDrawing';
import Login from './app/components/Login';
import Register from './app/components/Register';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/new_drawing" component={NewDrawing}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
