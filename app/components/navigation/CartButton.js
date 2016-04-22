import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

const CartButton = React.createClass({

    propTypes: {
        cartLength: PropTypes.number.isRequired
    },

    render () {
        return (
            <LinkContainer to='/cart'>
                <NavItem eventKey={-1}>
                    Корзина <span className="badge">{this.props.cartLength}</span>
                </NavItem>
            </LinkContainer>
        );
    }
});

export default CartButton;
