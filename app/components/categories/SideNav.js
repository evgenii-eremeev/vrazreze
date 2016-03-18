import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const SideNav = React.createClass({

    getInitialState () {
        return {
            active: null
        };
    },

    onCategoryClick(idx) {
        this.setState({ active: idx });
    },

    render () {
        return (
            <ul className="nav nav-pills nav-stacked">
                {this.props.categories.items.map((category, idx) => (
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

function mapStateToProps(state) {
    return {
        categories: state.categories
    };
}

export default connect(mapStateToProps)(SideNav);
