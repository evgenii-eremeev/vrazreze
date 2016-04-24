import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import styles from './Cart.css';
import { sumBy } from 'lodash';
import { Thumbnail } from 'react-bootstrap';

import OrderForm from './OrderForm';

import { removeFromTheCart, clearTheCart } from '../../actions/cartActions';
import { showLightbox } from '../../actions/lightboxActions.js';

const Cart = React.createClass({

    propTypes: {
        userAuthSession: PropTypes.object.isRequired,
        cart: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    },

    getInitialState () {
        return {
            showOrderForm: false
        };
    },

    openOrderForm () {
        this.setState({
            showOrderForm: true
        });
    },

    closeOrderForm () {
        this.setState({
            showOrderForm: false
        });
    },

    render () {
        const { dispatch, cart } = this.props;
        return (
            <div>
                <h1 className={styles.cartHeader}>
                    Корзина
                </h1>
                <Grid fluid={true}>
                    {cart.map((drawing, idx) => (
                        <Row
                            key={idx}
                            className={styles.item}
                            >
                            <Col sm={12} xs={12}>
                                <h4 className={styles.itemHeader}>
                                    { drawing.title }
                                </h4>
                            </Col>

                            <Col sm={3}>
                                {drawing.picture ?
                                    <Thumbnail
                                        src={`/pics/${drawing.picture}?dim=200x200`}
                                        alt={"drawing picture " + drawing.title}
                                        className={styles.picture}
                                        onClick={() => {
                                            dispatch(showLightbox(
                                                `/pics/${drawing.picture}`
                                            ))
                                        }}
                                        /> : ""}
                            </Col>
                            <Col sm={5}>
                                <p>{ drawing.description }</p>
                            </Col>
                            <Clearfix visibleXsBlock></Clearfix>
                            <Col sm={2} xs={6}>
                                <p className={styles.price}>
                                    { drawing.price } руб.
                                </p>
                            </Col>
                            <Col sm={2} xs={6}>
                                <button
                                    className="btn btn-danger pull-right"
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
                <p className={styles.priceTotal}>
                    <strong>Всего:</strong> { sumBy(cart, 'price') } рублей
                </p>
                <button
                    className={"btn btn-success btn-lg " + styles.orderButton}
                    onClick={() => {
                        if (cart.length > 0) {
                            this.openOrderForm()
                        } else {
                            alert('Корзина пуста');
                        }
                    }}
                    >
                    Заказать
                </button>
                <OrderForm
                    show={this.state.showOrderForm}
                    closeOrderForm={this.closeOrderForm}
                    />
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
