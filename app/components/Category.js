import React, { PropTypes } from 'react';

const Category = React.createClass({
    render () {
        let filtrated = this.props.drawings.filter(function (drawing) {
            return drawing.category === this.props.name;
        }, this);
        return (
            <div>
                {JSON.stringify(filtrated)}
            </div>
        );
    }
})

export default Category;
