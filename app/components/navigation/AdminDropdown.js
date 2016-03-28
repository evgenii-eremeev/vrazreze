import React, { PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminDropdown = React.createClass({
    render () {
        return (
            <NavDropdown eventKey={0} title="Admin" id="basic-nav-dropdown">
                <LinkContainer to='/admin/manage_categories'>
                    <MenuItem eventKey={0.1}>Управление категориями</MenuItem>
                </LinkContainer>
                <LinkContainer to='/admin/new_drawing'>
                    <MenuItem eventKey={0.2}>Добавить чертеж</MenuItem>
                </LinkContainer>
                <LinkContainer to='/admin/manage_drawings'>
                    <MenuItem eventKey={0.3}>Управление чертежами</MenuItem>
                </LinkContainer>
            </NavDropdown>
        );
    }
})

export default AdminDropdown;
