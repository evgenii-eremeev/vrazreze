import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
    render () {
        return (
            <div className="jumbotron" style={{backroundColor: 'transparent'}}>
                <div className="container">
                    <img src="/logo.png" style={{width: 500, display: 'block', margin: '0 auto'}}
                        className="img-responsive"
                        alt="logo"
                        />
                    <p>Самые актуальные чертежи вы можете найти здесь.</p>
                    <p><Link className="btn btn-primary btn-lg" to="/categories">Чертежи по категориям</Link></p>
                </div>
            </div>

        );
    }
});

export default Home;
