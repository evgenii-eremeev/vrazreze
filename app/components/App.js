import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { attemptFetchCategories, attemptFetchCategory } from '../actions/fetchDataActions';

import Navigation from './navigation/Navigation';

const App = React.createClass({

    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(attemptFetchCategories());
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
