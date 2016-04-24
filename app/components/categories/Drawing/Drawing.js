import React, { PropTypes } from 'react';
import { Thumbnail, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// actions
import { addToCart } from '../../../actions/cartActions.js';
import { showLightbox } from '../../../actions/lightboxActions.js';

// styles
import styles from './Drawing.css';

const Drawing = React.createClass({

    propTypes: {
        drawing: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        cart: PropTypes.array.isRequired
    },

    onPictureClick (event) {
        event.preventDefault();
        const { dispatch, drawing } = this.props;
        dispatch(showLightbox(`/pics/${drawing.picture}`));
    },

    onAddToCartClick () {
        const { dispatch, drawing } = this.props;
        dispatch(addToCart(drawing));
    },

    isAddedToCart () {
        const { cart, drawing } = this.props;
        return cart.some(item => item._id === drawing._id);
    },

    render () {
        const { drawing, dispatch } = this.props
        return (
            <div
                id={ drawing._id }
                className={"well " + styles.drawing}
                >
                <h2 className={styles.header}>
                    <Link
                        to={ "/drawing/" + drawing._id }
                        activeClassName={styles.linkClicked}
                        className={styles.linkNotClicked}
                        >
                        {drawing.title}
                    </Link>
                </h2>
                <Row>
                    <Col sm={6}>
                        <Thumbnail
                            href="#"
                            src={drawing.picture ?
                                `/pics/${drawing.picture}?dim=300x300` :
                                'http://placehold.it/200x200'}
                            alt={'picture ' + drawing.title}
                            onClick={this.onPictureClick}
                            className="img img-responsive"
                            />
                    </Col>
                    <Col sm={6}>
                        <p><strong>Цена: </strong>{drawing.price} рублей</p>
                        <p><strong>Состав: </strong>{drawing.drawing_composition}</p>
                        { this.isAddedToCart() ?
                            <Link to="/cart" className="btn btn-primary">
                                Перейти в корзину
                            </Link> :
                            <button
                                className={"btn btn-success " + styles.addToCartButton}
                                onClick={this.onAddToCartClick}
                                >
                                Добавить в корзину
                            </button>
                        }
                    </Col>
                </Row>
                <div>
                    <h4>Описание</h4>
                    <p>{drawing.description}</p>
                </div>
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}


export default connect(mapStateToProps)(Drawing);
