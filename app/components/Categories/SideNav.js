import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router';
import Category from './Category';

const SideNav = React.createClass({
    getInitialState () {
        return {
            categories: [],
            active: null
        };
    },

    componentWillMount () {
        $.getJSON('api/categories', function (categories) {
            this.setState({ categories });
        }.bind(this));
    },

    render () {
        return (
            <ul className="nav nav-pills nav-stacked">
                {this.state.categories.map((category, idx) => (
                    <li role="presentation"
                        onClick={() => {
                            this.setState({ active: idx })
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
})

export default SideNav;
