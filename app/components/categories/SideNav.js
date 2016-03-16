import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { attemptFetchCategory, attemptFetchCategories } from '../../actions/fetchDataActions';

const SideNav = React.createClass({

    getInitialState () {
        return {
            active: null
        };
    },

    onCategoryClick(idx, categoryUrl) {
        this.setState({ active: idx });
        this.props.dispatch(attemptFetchCategory(categoryUrl));
    },

    render () {
        return (
            <ul className="nav nav-pills nav-stacked">
                {this.props.categories.map((category, idx) => (
                    <li role="presentation"
                        key={idx}
                        onClick={() => {
                            this.onCategoryClick(idx, category.url);
                        }}
                        className={this.state.active === idx ? 'active' : ''}
                        >
                        <Link to={'/categories/' + category.url}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
});



export default connect()(SideNav);
