import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categoriesActions';

import Navigation from './navigation/Navigation';

const App = React.createClass({

    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(fetchCategories());
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
