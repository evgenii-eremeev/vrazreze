import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { attemptFetchDrawings, attemptFetchCategories } from '../../actions/fetchDataActions';

import { Grid, Row, Col } from 'react-bootstrap';
import SideNav from './SideNav';
import Category from './Category';


const Categories = React.createClass({

    filterDrawings(categoryUrl, categories, drawings) {
        const { dispatch } = this.props;

        if (!categoryUrl) {
            return [];
        }
        if (!categories.length || !drawings.length) {
            // window.location = '/categories';
            // return [];
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
                    <Col sm={3}><SideNav categories={this.props.categories}/></Col>
                    <Col sm={9}>
                        <Category
                            drawings={this.filterDrawings(
                                this.props.params.category,
                                this.props.categories,
                                this.props.drawings
                            )}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: state.data.categories,
        drawings: state.data.drawings
    };
};

export default connect(mapStateToProps)(Categories);
