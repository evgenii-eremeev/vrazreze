import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDrawings } from '../../actions/drawingsActions';
import { addToCart } from '../../actions/cartActions';

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
        const { drawings, dispatch } = this.props;

        return (
            drawings.isFetching ?
                <div>
                    <p>Загружаем...</p>
                </div>
                :
                <div>
                    {drawings.items.map((drawing, index) => (
                        <Drawing
                            key={index}
                            drawing={drawing}
                            />
                    ))}
                    { drawings.error }
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
