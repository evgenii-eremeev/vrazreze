import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { attemptFetchCategory, attemptFetchCategories, fetchCategory } from '../../actions/fetchDataActions';

import Drawings from './Drawings';

const Category = React.createClass({

    componentWillMount() {
        const { dispatch, params } = this.props;
        // dispatch(attemptFetchCategory(params.categoryUrl));
        console.log('wmt', params.categoryUrl)
        $.getJSON('api/category/' + params.categoryUrl, function (category) {
            console.log('fetchCategory... wil mnt');
            dispatch(fetchCategory(category));
        });
    },

    componentDidMount() {
        const { dispatch, params } = this.props;
        // dispatch(attemptFetchCategory(params.categoryUrl));
        console.log('did mt', params.categoryUrl)
        $.getJSON('api/category/' + params.categoryUrl, function (category) {
            console.log('fetchCategory...');
            dispatch(fetchCategory(category));
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.categoryUrl !== this.props.params.categoryUrl) {
            const { dispatch, params, category } = nextProps
            // dispatch(attemptFetchCategory(params.categoryUrl));
            console.log('wrp ' + params.categoryUrl);
            $.getJSON('api/category/' + params.categoryUrl, function (category) {
                console.log('fetchCategory...');
                dispatch(fetchCategory(category));
            });
        }
    },

    render () {
        return (
            <div>
                {this.props.params.categoryUrl}
                <Drawings drawings={this.props.category} />
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        category: state.data.category
    };
}

export default connect(mapStateToProps)(Category);
