import React, { PropTypes } from 'react';
import Drawing from './Drawing';


const Category = React.createClass({
    render () {
        return (
            <div>
                {this.props.drawings.map((drawing, index) => {
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

export default Category;
