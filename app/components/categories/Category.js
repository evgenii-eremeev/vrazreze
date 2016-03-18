import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDrawings } from '../../actions/drawingsActions';

import Drawing from './Drawing';

const Category = React.createClass({

    componentDidMount() {
        const { dispatch, params } = this.props;
        dispatch(fetchDrawings(params.categoryUrl));
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.categoryUrl !== this.props.params.categoryUrl) {
            const { dispatch, params, category } = nextProps
            dispatch(fetchDrawings(params.categoryUrl));
        }
    },

    render () {
        return (
            <div>
                {this.props.category.map((drawing, index) => {
                    return <Drawing key={index}
                                    title={drawing.title}
                                    description={drawing.description}
                                    picture={drawing.picture}
                                    drawing_composition={drawing.drawing_composition}
                                    price={drawing.price}
                                    tags={drawing.tags}
                                    created={drawing.created} />
                })}
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
