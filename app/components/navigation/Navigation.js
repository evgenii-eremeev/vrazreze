import React, { PropTypes } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { IndexLink } from 'react-router';

import CollapseMenu from './CollapseMenu';

const Navigation = React.createClass({

    render () {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to='/'>ВРАЗРЕЗЕ.РФ</IndexLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <CollapseMenu />
                </Navbar.Collapse>
            </Navbar>
        );
    }
});


export default Navigation;
