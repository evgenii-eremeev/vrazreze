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
            const { dispatch, params } = nextProps
            dispatch(fetchDrawings(params.categoryUrl));
        }
    },

    render () {
        const { drawings } = this.props;

        return (
            drawings.isFetching ?
                <p>Загружаем...</p> :
                <div>
                    {drawings.items.map((drawing, index) => (
                        <Drawing key={index} drawing={drawing} />
                    ))}
                </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        drawings: state.drawings
    };
}

export default connect(mapStateToProps)(Category);
