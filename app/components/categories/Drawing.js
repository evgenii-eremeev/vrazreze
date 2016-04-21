import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { addToCart } from '../../actions/cartActions';

const Drawing = ({
    drawing,
    dispatch
}) => {
    return (
        <div
            id={ drawing._id }
            className="well"
            style={{paddingTop: 0, paddingBottom: 0, overflow: 'auto'}}
            >
            <div className="pull-left" style={{ margin: '25px 20px 15px 0' }}>
                {/* show placeholer if picture does't exist */}
                <img
                    src={drawing.picture ?
                        `/pics/${drawing.picture}?dim=200x200` :
                        'http://placehold.it/200x200'}
                    style={{ border: '2px solid lightgrey', borderRadius: 5 }}
                    alt={'picture ' + drawing.title}
                    />

                <button
                    className="btn btn-success"
                    style={{display: 'block', margin: '12px 0', width: 200}}
                    onClick={() => (
                        dispatch(addToCart(drawing))
                    )}
                    >
                    Добавить в корзину
                </button>

                <p><strong>Цена: </strong>{drawing.price} рублей</p>
            </div>
            <div style={{padding: '0 50'}}>
                <h2>{drawing.title}</h2>
                <p>{drawing.description}</p>
                <p><strong>Состав: </strong>{drawing.drawing_composition}</p>
            </div>
        </div>
    );
};


export default connect()(Drawing);
