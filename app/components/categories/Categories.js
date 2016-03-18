import React, { PropTypes } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import SideNav from './SideNav';


const Categories = React.createClass({

    render () {
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col sm={3}><SideNav /></Col>
                    <Col sm={9}>
                        { this.props.children }
                    </Col>
                </Row>
            </Grid>
        );
    }
});


export default Categories;
