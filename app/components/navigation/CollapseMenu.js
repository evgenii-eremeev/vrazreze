import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import AdminDropdown from './AdminDropdown';
import CartButton from './CartButton';

import { connect } from 'react-redux';
import { attemptLogout } from '../../actions/authActions';

const CollapseMenu = React.createClass({

    propTypes: {
        userAuthSession: PropTypes.object.isRequired,
        cart: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    },

    onLogoutClick() {
        this.props.dispatch(attemptLogout());
    },

    render () {
        const { userAuthSession, cart } = this.props;
        const { userObject } = userAuthSession;
        const cartButton = (
            cart.length ?
            <Nav>
                <CartButton cartLength={cart.length}/>
            </Nav> : ""
        );

        return (
            userAuthSession.isLoggedIn ?
                <Nav pullRight>
                    { cartButton }
                    { userObject.role === 'admin' ? <AdminDropdown /> : "" }
                    <NavItem eventKey={1}>
                        { userObject.username }
                    </NavItem>
                    <NavItem eventKey={2} onClick={this.onLogoutClick}>
                        Выйти
                    </NavItem>
                </Nav>
                :
                <Nav pullRight>
                    { cartButton }
                    <LinkContainer to='/login'>
                        <NavItem eventKey={1}>Вход</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/signup'>
                        <NavItem eventKey={2}>Регистрация</NavItem>
                    </LinkContainer>
                </Nav>
        );
    }
});


function mapStateToProps(state) {
    return {
        cart: state.cart,
        userAuthSession: state.userAuthSession
    };
}

export default connect(mapStateToProps)(CollapseMenu);
