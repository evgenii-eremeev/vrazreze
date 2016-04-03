import React, { PropTypes } from 'react';

const Drawing = ({
    drawing,
    onAddToCartClick
}) => {
    return (
        <div id={ drawing._id } className="well" style={{paddingTop: 0, paddingBottom: 0, overflow: 'auto'}}>
            <div className="pull-left" style={{ margin: '25px 20px 15px 0' }}>
                <img
                    src={"/uploads/" + drawing.picture}
                    style={{ width: 200, border: '2px solid lightgrey', borderRadius: 5 }}
                    alt={'picture ' + drawing.title}
                    />
                <button
                    className="btn btn-success"
                    style={{display: 'block', margin: '12px 0', width: 200}}
                    onClick={onAddToCartClick}
                    >
                    Добавить в корзину
                </button>
                <p><strong>Цена:</strong> {drawing.price} рублей</p>
            </div>
            <div style={{padding: '0 50'}}>
                <h2>{drawing.title}</h2>
                <p>{drawing.description}</p>
                <p><strong>Состав:</strong> {drawing.drawing_composition}</p>
            </div>
        </div>
    );
};

export default Drawing;
