import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';
import SideNav from './SideNav';


const Categories = React.createClass({

    render () {
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col sm={3}><SideNav categories={this.props.categories}/></Col>
                    <Col sm={9}>
                        { this.props.children }
                    </Col>
                </Row>
            </Grid>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: state.data.categories
    };
}

export default connect(mapStateToProps)(Categories);
