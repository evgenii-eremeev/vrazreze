import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';

const navbarInstance = (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>Чертежи</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Добавить</NavItem>
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
        <li><Link to='/login' eventKey={1}>Вход</Link></li>
        <li><Link to='/register' eventKey={2}>Регистрация</Link></li>
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
