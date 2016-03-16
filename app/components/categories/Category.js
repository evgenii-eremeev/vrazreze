import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { attemptFetchCategory, attemptFetchCategories } from '../../actions/fetchDataActions';

import Drawings from './Drawings';

const Category = React.createClass({

    componentDidMount() {
        const { dispatch, params } = this.props;
        dispatch(attemptFetchCategory(params.categoryUrl));
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.categoryUrl !== this.props.params.categoryUrl) {
            const { dispatch, params, category } = nextProps
            dispatch(attemptFetchCategory(params.categoryUrl));
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
