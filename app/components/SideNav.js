import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const SideNav = React.createClass({
    render () {
        return (
            <Tabs id="sidenav" defaultActiveKey={1} position="left" tabWidth={3}>
                <Tab eventKey={1} title="Машиностроение">Машиностроение content </Tab>
                <Tab eventKey={2} title="Сельское хозяйство">Сельское хозяйство content</Tab>
                <Tab eventKey={3} title="Промышленность">Промышленность content</Tab>
                <Tab eventKey={4} title="Строительсво">Строительсво content</Tab>
                <Tab eventKey={5} title="Схемы">Схемы content</Tab>
                <Tab eventKey={6} title="Транспорт">Транспорт content</Tab>
                <Tab eventKey={7} title="Станки">Станки content</Tab>
                <Tab eventKey={8} title="Прочее">Прочее content</Tab>
            </Tabs>
        );
    }
})

export default SideNav;
