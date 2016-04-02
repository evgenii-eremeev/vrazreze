import React, { PropTypes } from 'react';

const Drawing = ({
    drawing
}) => {
    return (
        <div className="well" style={{paddingTop: 0, paddingBottom: 0, overflow: 'auto'}}>
            <div className="pull-left" style={{ margin: '25px 20px 15px 0' }}>
                <img
                    src={"/uploads/" + drawing.picture}
                    style={{ width: 200, border: '2px solid lightgrey', borderRadius: 5 }}
                    alt={'picture ' + drawing.title}
                    />
                <button
                    className="btn btn-success"
                    style={{display: 'block', marginTop: 15}}
                    >
                    Добавить в корзину
                </button>
            </div>
            <div style={{padding: '0 50'}}>
                <h2>{drawing.title}</h2>
                <p>{drawing.description}</p>
                <p><strong>Состав:</strong> {drawing.drawing_composition}</p>
                <p><strong>Цена:</strong> {drawing.price} руб.</p>
            </div>
        </div>
    );
};

export default Drawing;
