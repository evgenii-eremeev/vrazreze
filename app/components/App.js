import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { attemptFetchDrawings, attemptFetchCategories } from '../actions/fetchDataActions';

import Navigation from './navigation/Navigation';

const App = React.createClass({

    componentWillMount () {
        const { dispatch } = this.props;
        dispatch(attemptFetchDrawings()).then(() => {
            console.log('Done drawings in App!');
        });
        dispatch(attemptFetchCategories()).then(() => {
            console.log('Done categories in App!');
        });
    },

    render () {
        return (
            <div>
                <Navigation />
                { this.props.children }
            </div>
        );
    }
});

export default connect()(App);
