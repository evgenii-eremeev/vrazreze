import React, { PropTypes } from 'react';
import { Navbar } from 'react-bootstrap';
import { IndexLink } from 'react-router';
import NavRight from './NavRight';

const Navigation = React.createClass({
    render () {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to='/'>Чертежи</IndexLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <NavRight />
                </Navbar.Collapse>
            </Navbar>
        );
    }
});


export default Navigation;
