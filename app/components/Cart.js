import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Cart = React.createClass({
    render () {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Корзина</h1>
                    {this.props.cart.map(d => <p>{d.title}</p>)}
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

export default connect(mapStateToProps)(Cart);
