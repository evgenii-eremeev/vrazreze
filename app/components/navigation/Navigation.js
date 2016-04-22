import React, { PropTypes } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { IndexLink } from 'react-router';

import CollapseMenu from './CollapseMenu';
import CartButton from './CartButton';

import { connect } from 'react-redux';
import { attemptLogout } from '../../actions/authActions';


const Navigation = React.createClass({

    propTypes: {
        cart: PropTypes.array.isRequired,
        userAuthSession: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    },

    handleOnLogoutClick () {
        this.props.dispatch(attemptLogout());
    },

    render () {
        const { cart } = this.props;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to='/'>Чертежи</IndexLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Nav>
                    {cart.length ? <CartButton cartLength={cart.length}/> : ""}
                </Nav>
                <Navbar.Collapse>
                    <CollapseMenu
                        onLogoutClick={this.handleOnLogoutClick}
                        userAuthSession={this.props.userAuthSession}
                        />
                </Navbar.Collapse>
            </Navbar>
        );
    }
});

function mapStateToProps(state) {
    return {
        cart: state.cart,
        userAuthSession: state.userAuthSession
    };
}

export default connect(mapStateToProps)(Navigation);
