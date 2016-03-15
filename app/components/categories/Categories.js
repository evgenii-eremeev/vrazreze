import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SideNav from './SideNav';
import Category from './Category';


const Categories = React.createClass({

    getInitialState () {
        return {
            drawings: [],
            categories: []
        };
    },

    componentWillMount() {
        $.getJSON('api/drawings', function (drawings) {
            this.setState({ drawings });
        }.bind(this));

        $.getJSON('api/categories', function (categories) {
            this.setState({ categories });
        }.bind(this));
    },

    filterDrawings(categoryUrl, categories, drawings) {
        if (!categoryUrl) {
            return [];
        }
        const categoryId = categories.filter(category =>
            category.url === categoryUrl
        )[0]._id;
        const filteredDrawings = drawings.filter(drawing =>
            drawing.category === categoryId
        )
        return filteredDrawings;
    },

    render () {

        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col sm={3}><SideNav categories={this.state.categories}/></Col>
                    <Col sm={9}>
                        <Category
                            drawings={this.filterDrawings(
                                this.props.params.category,
                                this.state.categories,
                                this.state.drawings
                            )}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Categories;
