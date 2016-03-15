import React, { PropTypes } from 'react';

import Navigation from './Navigation/Navigation';

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
