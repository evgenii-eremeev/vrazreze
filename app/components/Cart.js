import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { removeFromTheCart, clearTheCart } from '../actions/cartActions';

const Cart = React.createClass({
    render () {
        const { dispatch, cart } = this.props;
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Корзина</h1>
                <div className="table-responsive">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>Цена</th>
                                <th>Изображение</th>
                                <th>Наименование</th>
                                <th>Описание</th>
                                <th style={{ textAlign: 'center'}}>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((drawing, idx) => (
                                <tr key={idx}>
                                    <td>{ drawing.price }</td>
                                    <td><img
                                        src={`/uploads/${drawing.picture}`}
                                        style={{maxWidth: 150}}
                                        alt="drawing picture"
                                        />
                                    </td>
                                    <td>{ drawing.title }</td>
                                    <td>{ drawing.description }</td>
                                    <td style={{ textAlign: 'center'}}>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => (
                                                dispatch(removeFromTheCart(idx))
                                            )}
                                            >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p><strong>Всего:</strong> {cart.reduce((accum, drawing) => (
                    accum + drawing.price
                ), 0)} рублей</p>
                <button className="btn btn-success">Оформить заказ</button>
                <button
                    className="btn btn-default pull-right"
                    style={{margin: '0 15px'}}
                    onClick={() => (
                        dispatch(clearTheCart())
                    )}
                    >
                    Очистить корзину
                </button>
            </div>

        );
    }
});

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

export default connect(mapStateToProps)(Cart);
