import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categoriesActions';
import { checkSessionStatus } from '../actions/authActions';

import Navigation from './navigation/Navigation';
import Lightbox from './Lightbox';

const App = React.createClass({

    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(fetchCategories());
        dispatch(checkSessionStatus());
    },

    render () {
        return (
            <div>
                <Navigation />
                { this.props.children }
                <Lightbox />
            </div>
        );
    }
});

export default connect()(App);
