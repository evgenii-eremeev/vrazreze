import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSingleDrawing } from '../../actions/singleDrawingActions.js';

import Drawing from './Drawing';

const SingleDrawing = React.createClass({

    componentDidMount() {
        const { dispatch, params } = this.props;
        dispatch(fetchSingleDrawing(params.id));
    },

    render () {
        const { singleDrawing, dispatch } = this.props;

        return (
            singleDrawing.isFetching ?
                <div>
                    <p>Загружаем...</p>
                </div>
                :
                <Drawing drawing={singleDrawing.drawing}/>
        );
    }
});

function mapStateToProps(state) {
    return {
        singleDrawing: state.singleDrawing
    };
}

export default connect(mapStateToProps)(SingleDrawing);
