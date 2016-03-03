import React, { PropTypes } from 'react';

import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';

const App = React.createClass({
    render () {
        return (
            <div>
                <Navigation />
                { this.props.children }
            </div>
        );
    }
})

export default App;
