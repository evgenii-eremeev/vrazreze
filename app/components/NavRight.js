import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavRight = React.createClass({
    getInitialState () {
        return {
            username: sessionStorage.username
        };
    },
    onLogoutClick () {
        sessionStorage.clear();
        this.setState({
            username: ""
        });
        $.get('/logout', function (data) {
            console.log(data)
        });
    },
    render () {
        let beforeLogin = (
            <Nav pullRight>
                <LinkContainer to='/login'>
                    <NavItem eventKey={1}>Вход</NavItem>
                </LinkContainer>
                <LinkContainer to='/register'>
                    <NavItem eventKey={2}>Регистрация</NavItem>
                </LinkContainer>
            </Nav>
        );

        let afterLogin = (
            <Nav pullRight>
                <LinkContainer to='new_drawing'>
                    <NavItem eventKey={1}>Добавить</NavItem>
                </LinkContainer>
                <NavItem eventKey={1}>
                    {this.state.username}
                </NavItem>
                <NavItem eventKey={2} onClick={this.onLogoutClick}>
                    Выйти
                </NavItem>
            </Nav>
        );
        return (
            this.state.username ? afterLogin : beforeLogin
        );
    }
})

export default NavRight;
