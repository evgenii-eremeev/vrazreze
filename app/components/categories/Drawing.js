import React, { PropTypes } from 'react';
import { Thumbnail } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addToCart } from '../../actions/cartActions';
import { showLightbox } from '../../actions/lightboxActions';

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
            <h2 style={{
                    textAlign: 'center',
                    marginBottom: 20
                }}>
                {drawing.title}
            </h2>
            <div className="pull-left" style={{ marginRight: 20 }}>
                <Thumbnail
                    href="#"
                    src={drawing.picture ?
                        `/pics/${drawing.picture}?dim=200x200` :
                        'http://placehold.it/200x200'}
                    alt={'picture ' + drawing.title}
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(showLightbox(`/pics/${drawing.picture}`))
                    }}
                    />

                <button
                    className="btn btn-success"
                    style={{display: 'block', margin: '12px 0', width: 210}}
                    onClick={() => (
                        dispatch(addToCart(drawing))
                    )}
                    >
                    Добавить в корзину
                </button>

                <p><strong>Цена: </strong>{drawing.price} рублей</p>
            </div>
            <div>
                <p>{drawing.description}</p>
                <p><strong>Состав: </strong>{drawing.drawing_composition}</p>
            </div>
        </div>
    );
};


export default connect()(Drawing);
