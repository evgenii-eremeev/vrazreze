import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SideNav from './SideNav';

const Home = React.createClass({
    render () {
        return (
            <Link to="/categories">Categories</Link>
        );
    }
});

export default Home;
