import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';


const navbarInstance = (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <IndexLink to='/'>Чертежи</IndexLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to='new_drawing'>
            <NavItem eventKey={1}>Добавить</NavItem>
        </LinkContainer>
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
      <Nav pullRight>
        <LinkContainer to='/login'>
            <NavItem eventKey={1}>Вход</NavItem>
        </LinkContainer>
        <LinkContainer to='/register'>
            <NavItem eventKey={2}>Регистрация</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const Navigation = React.createClass({
    render () {
        return (
            navbarInstance
        )
    }
});


export default Navigation;
