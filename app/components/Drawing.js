import React, { PropTypes } from 'react';

const Drawing = ({
    title,
    description,
    price,
    drawing_composition,
    tags,
    created,
    picture
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={"uploads/" + picture} />
            <p>{description}</p>
            <p>Состав: {drawing_composition}</p>
            <p>Цена: {price} руб.</p>
            <p>Ключевые слова: {tags}</p>
            <p>Дата: {created}</p>
        </div>
    );
};

export default Drawing;
