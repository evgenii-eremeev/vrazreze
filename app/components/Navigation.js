import React, { PropTypes } from 'react';
import { Navbar } from 'react-bootstrap';
import { IndexLink } from 'react-router';
import NavLeft from './NavLeft';

const Navigation = React.createClass({
    render () {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to='/'>Чертежи</IndexLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <NavLeft />
                </Navbar.Collapse>
            </Navbar>
        );
    }
});


export default Navigation;
