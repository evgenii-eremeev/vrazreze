import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
    render () {
        return (
            <div className="jumbotron" style={{backroundColor: 'transparent'}}>
                <img src="/logo.png" style={{width: 500, display: 'block', margin: '0 auto'}}
                    className="img-responsive"
                    alt="logo"
                    />
                <p>Много чертежей.</p>
                <p><Link className="btn btn-primary btn-lg" to="/categories">Чертежи по категориям</Link></p>
            </div>

        );
    }
});

export default Home;
