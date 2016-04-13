import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchDrawings, deleteDrawing } from '../../actions/drawingsActions';

const MangageDrawings = React.createClass({

    getInitialState () {
        return {
            active: null
        };
    },

    render () {
        const { drawings, categories, dispatch } = this.props;
        return (
            <div style={{maxWidth: 800, margin: '0 auto', padding: '0 10px'}}>
                <h1 style={{textAlign: 'center'}}>Управление чертежами</h1>

                <ul className="nav nav-pills">
                    {categories.items.map((category, idx) => (
                        <li
                            role="presentation"
                            key={idx}
                            className={ idx === this.state.active ? "active" : "" }
                            >
                            <a href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        active: idx
                                    });
                                    return dispatch(fetchDrawings(category.url));
                                }}>
                                { category.name }
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Картинка</th>
                                <th>Дата создания</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Цена</th>
                                <th style={{ textAlign: 'center'}}>Редактировать</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drawings.items.map((drawing, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <img src={`/pics/${drawing.picture}?dim=100x100`}/>
                                    </td>
                                    <td>{ new Date(drawing.created).toLocaleString() }</td>
                                    <td>{ drawing.title }</td>
                                    <td>{ drawing.description.slice(0, 70) + '...' }</td>
                                    <td>{ drawing.price }</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            className="btn btn-danger btn-small"
                                            onClick={() => {
                                                dispatch(deleteDrawing(drawing._id, drawings.categoryUrl))
                                            }}
                                            >
                                            Del
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        drawings: state.drawings,
        categories: state.categories
    };
}

export default connect(mapStateToProps)(MangageDrawings);
