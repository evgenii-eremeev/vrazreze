import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SideNav from './SideNav';
import Category from './Category';

const Categories = React.createClass({
    getInitialState () {
        return {
            drawings: []
        };
    },
    componentWillMount() {
        $.getJSON('api/drawings', function (drawings) {
            that.setState({ drawings });
        }.bind(this));
    },
    render () {
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col sm={3}><SideNav /></Col>
                    <Col sm={9}>
                        <Category
                            name={this.props.params.category}
                            drawings={this.state.drawings}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Categories;
