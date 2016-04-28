import React, { PropTypes } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import SideNav from './SideNav';
import Search from '../Search';


const Categories = React.createClass({

    render () {
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col sm={3}><SideNav /></Col>
                    <Col sm={9}>
                        { this.props.children ?
                            this.props.children :
                            <Search />
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
});


export default Categories;
