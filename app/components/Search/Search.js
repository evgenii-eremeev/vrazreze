import React, { PropTypes } from 'react';
import { Row, Col, Clearfix } from 'react-bootstrap';
import { connect } from 'react-redux';

import { search } from '../../actions/searchActions';

class Search extends React.Component {

    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        const { dispatch, searchData } = this.props;
        const query = this.refs.search.value.trim();
        console.log('query', query)
        dispatch(search(query)).then(() => {
            console.log(searchData);
        });
    }

    render () {
        return (
            <div>
                <h1 className="text-center">Поиск чертежей</h1>
                <br />
                <form
                    onSubmit={this.handleSubmit}
                    >
                    <Row>
                        <Col md={10} sm={10} xs={10}>
                            <input className="form-control" type="text" ref="search" />
                        </Col>
                        <Col md={2} sm={2} xs={2}>
                            <button
                                type="submit"
                                className="btn btn-default"
                                >
                                Поиск
                            </button>
                        </Col>
                        <Clearfix visibleMdBlock visibleSmBlock visibleXsBlock visibleLgBlock/>
                    </Row>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchData: state.searchData
    };
}


export default connect(mapStateToProps)(Search);
