import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { removeFromTheCart, clearTheCart } from '../actions/cartActions';

const Cart = React.createClass({
    render () {
        const { dispatch, cart, userAuthSession } = this.props;
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
                                    {/* don't show empty picture */}
                                    <td>
                                        {drawing.picture ?
                                            <img
                                                src={`/pics/${drawing.picture}?dim=100x100`}
                                                alt={"drawing picture " + drawing.title}
                                                /> : ""}
                                    </td>
                                    <td>{drawing.title}</td>
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
                <button
                    className="btn btn-success pull-left"
                    style={{display: 'block', margin: '12px 0', width: 200}}
                    onClick={() => {
                        fetch('/mail/order', {
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                user: userAuthSession.userObject,
                                cart
                            })})
                            .then(response => response.text())
                            .then((text) => {
                                alert(text)
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }}
                    >
                    Заказать
                </button>
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
        cart: state.cart,
        userAuthSession: state.userAuthSession
    };
}

export default connect(mapStateToProps)(Cart);
