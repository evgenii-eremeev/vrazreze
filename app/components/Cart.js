import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import { sumBy } from 'lodash';

import { removeFromTheCart, clearTheCart } from '../actions/cartActions';

const Cart = React.createClass({

    onOrderClickHandler () {
        const { userAuthSession, cart } = this.props;
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
            });
    },

    render () {
        const { dispatch, cart } = this.props;
        return (
            <div>
                <h1 style={{textAlign: 'center', marginBottom: 20}}>
                    Корзина
                </h1>
                <Grid fluid={true}>
                    {cart.map((drawing, idx) => (
                        <Row
                            key={idx}
                            style={{
                                marginBottom: 10,
                                padding: "10px 0",
                                border: "1px solid #aaa",
                                borderRadius: 7,
                                boxShadow: "5px 5px 7px #ccc"
                            }}
                            >
                            <Col sm={12} xs={12}>
                                <h4 style={{
                                        fontWeight: "bold",
                                        padding: "10px 0"
                                    }}>
                                    { drawing.title }
                                </h4>
                            </Col>

                            <Col sm={3}>
                                {/* don't show empty picture */}
                                {drawing.picture ?
                                    <img
                                        src={`/pics/${drawing.picture}?dim=90x90`}
                                        alt={"drawing picture " + drawing.title}
                                        style={{
                                            borderRadius: 5,
                                            float: 'left',
                                            margin: "0 10px 10px 0"
                                        }}
                                        /> : ""}
                            </Col>
                            <Col sm={5}>
                                <p>{ drawing.description }</p>
                            </Col>
                            {/* clearfix */}
                            <br style={{clear: 'both'}} />
                            <Col sm={2} xs={6}>
                                <strong>{ drawing.price } руб.</strong>
                            </Col>
                            <Col sm={2} xs={6}>
                                <button
                                    className="btn btn-sm btn-danger pull-right"
                                    onClick={() => (
                                        dispatch(removeFromTheCart(idx))
                                    )}
                                    >
                                    Удалить
                                </button>
                            </Col>
                        </Row>
                    ))}
                </Grid>
                <hr />
                <p><strong>Всего:</strong> { sumBy(cart, 'price') } рублей</p>
                <button
                    className="btn btn-success pull-left"
                    style={{display: 'block', margin: '12px 0 60px 0', width: 200}}
                    onClick={() => {
                        if (cart.length > 0) {
                            this.onOrderClickHandler()
                        } else {
                            alert('Корзина пуста');
                        }
                    }}
                    >
                    Заказать
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
