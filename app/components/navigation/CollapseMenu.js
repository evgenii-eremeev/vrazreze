import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import AdminDropdown from './AdminDropdown';

const CollapseMenu = React.createClass({

    propTypes: {
        userAuthSession: PropTypes.object.isRequired,
        onLogoutClick: PropTypes.func.isRequired
    },

    render () {
        const { userAuthSession } = this.props;
        const { userObject } = userAuthSession;
        return (
            userAuthSession.isLoggedIn ?
                <Nav pullRight>
                    { userObject.role === 'admin' ? <AdminDropdown /> : "" }
                    <NavItem eventKey={1}>
                        { userObject.username }
                    </NavItem>
                    <NavItem eventKey={2} onClick={this.props.onLogoutClick}>
                        Выйти
                    </NavItem>
                </Nav>
                :
                <Nav pullRight>
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

export default CollapseMenu;
