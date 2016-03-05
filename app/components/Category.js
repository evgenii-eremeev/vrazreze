import React, { PropTypes } from 'react';
import Drawing from './Drawing';


const Category = React.createClass({
    render () {
        let filtrated = this.props.drawings.map(function (drawing, index) {
            if (drawing.category === this.props.name) {
                return <Drawing key={index}
                                title={drawing.title}
                                description={drawing.description}
                                picture={drawing.picture}
                                drawing_composition={drawing.drawing_composition}
                                price={drawing.price}
                                tags={drawing.tags}
                                created={drawing.created} />
            }
        }, this);
        return (
            <div>
                {filtrated}
            </div>
        );
    }
});

export default Category;
