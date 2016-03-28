import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchDrawings, deleteDrawing } from '../../actions/drawingsActions';

const MangageDrawings = React.createClass({
    render () {
        const { drawings, categories, dispatch } = this.props;
        return (
            <div style={{maxWidth: 800, margin: '0 auto', padding: '0 10px'}}>
                <h1 style={{textAlign: 'center'}}>Управление чертежами</h1>

                {categories.items.map((category, idx) => (
                        <button
                            key={idx}
                            className="btn btn-default"
                            style={{margin: 5}}
                            onClick={() => (
                                dispatch(fetchDrawings(category.url))
                            )}
                            >
                            { category.name }
                        </button>
                ))}

                <table className="table table-hover">
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
                                    <img src={"/uploads/" + drawing.picture} style={{maxWidth: 75}}/>
                                </td>
                                <td>{ new Date(drawing.created).toLocaleString() }</td>
                                <td>{ drawing.title }</td>
                                <td>{ drawing.description }</td>
                                <td>{ drawing.price }</td>
                                <td style={{ textAlign: 'center'}}>
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
