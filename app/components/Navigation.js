import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = React.createClass({
    render () {
        let username = sessionStorage.username;
        let addButton = (
            <LinkContainer to='new_drawing'>
                <NavItem eventKey={1}>Добавить</NavItem>
            </LinkContainer>
        );
        let authRight = (
            <Nav pullRight>
                <LinkContainer to='/login'>
                    <NavItem eventKey={1}>Вход</NavItem>
                </LinkContainer>
                <LinkContainer to='/register'>
                    <NavItem eventKey={2}>Регистрация</NavItem>
                </LinkContainer>
            </Nav>
        );
        let logoutRight = (
            <Nav pullRight>
                <Navbar.Text eventKey={1}>
                    {username}
                </Navbar.Text>
            </Nav>
        );
        return (
            <Navbar inverse>
              <Navbar.Header>
                <Navbar.Brand>
                  <IndexLink to='/'>Чертежи</IndexLink>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  {username ? addButton : ""}
                  <NavDropdown eventKey={3} title="Категории" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Машиностроение</MenuItem>
                    <MenuItem eventKey={3.2}>Сельское хозяйство</MenuItem>
                    <MenuItem eventKey={3.3}>Промышленность</MenuItem>
                    <MenuItem eventKey={3.3}>Строительсво</MenuItem>
                    <MenuItem eventKey={3.4}>Схемы</MenuItem>
                    <MenuItem eventKey={3.5}>Транспорт</MenuItem>
                    <MenuItem eventKey={3.6}>Станки</MenuItem>
                    <MenuItem eventKey={3.7}>Прочее</MenuItem>
                  </NavDropdown>
                </Nav>
                { username ? logoutRight : authRight }
              </Navbar.Collapse>
            </Navbar>
        );
    }
});


export default Navigation;
