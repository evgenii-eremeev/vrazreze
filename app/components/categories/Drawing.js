import React, { PropTypes } from 'react';

const Drawing = ({
    drawing
}) => {
    return (
        <div>
            <h1>{drawing.title}</h1>
            <img src={"uploads/" + drawing.picture} style={{maxWidth: 200}}/>
            <p>{drawing.description}</p>
            <p>Состав: {drawing.drawing_composition}</p>
            <p>Цена: {drawing.price} руб.</p>
            <p>Ключевые слова: {drawing.tags}</p>
            <p>Дата: {drawing.created}</p>
        </div>
    );
};

export default Drawing;
