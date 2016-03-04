import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Category from './Category'

const SideNav = React.createClass({
    getInitialState () {
        return {
            drawings: []
        };
    },
    componentWillMount() {
        let that = this;
        $.getJSON('api/drawings', function (drawings) {
            that.setState({ drawings });
        });
    },
    render () {
        return (
            <Tabs id="sidenav" defaultActiveKey={1} position="left" tabWidth={3}>
                <Tab eventKey={1} title="Машиностроение">
                    <Category name="Машиностроение" drawings={ this.state.drawings }/>
                </Tab>
                <Tab eventKey={2} title="Сельское хозяйство">
                    <Category name="Сельское хозяйство" drawings={ this.state.drawings }/>
                </Tab>
                <Tab eventKey={3} title="Промышленность">
                    <Category name="Промышленность" drawings={ this.state.drawings }/>
                </Tab>
                <Tab eventKey={4} title="Строительсво">
                    <Category name="Строительсво" drawings={ this.state.drawings }/>
                </Tab>
                <Tab eventKey={5} title="Схемы">
                    <Category name="Схемы" drawings={ this.state.drawings }/>
                </Tab>
                <Tab eventKey={6} title="Транспорт">
                    <Category name="Транспорт" drawings={ this.state.drawings }/>
                </Tab>
                <Tab eventKey={7} title="Станки">
                    <Category name="Станки" drawings={ this.state.drawings }/>
                </Tab>
                <Tab eventKey={8} title="Прочее">
                    <Category name="Прочее" drawings={ this.state.drawings }/>
                </Tab>
            </Tabs>
        );
    }
})

export default SideNav;
