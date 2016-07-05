import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// actions
import { addToCart } from '../../../actions/cartActions.js';
import { showLightbox } from '../../../actions/lightboxActions.js';

// styles
import styles from './Drawing.css';

const Drawing = React.createClass({

    propTypes: {
        drawing: PropTypes.object.isRequired, // as parameter
        dispatch: PropTypes.func.isRequired,
        cart: PropTypes.array.isRequired
    },

    onPictureClick () {
        const { dispatch, drawing } = this.props;
        dispatch(showLightbox(`/pics/${drawing.picture}`));
    },

    onAddToCartClick (e) {
        e.preventDefault();
        const { dispatch, drawing } = this.props;
        dispatch(addToCart(drawing));
    },

    isAddedToCart () {
        const { cart, drawing } = this.props;
        return cart.some(item => item._id === drawing._id);
    },

    render () {
        const cartButton = this.isAddedToCart() ?
            <Link to="/cart"
                className={styles['drawing__button'] + " " + styles['lightblue']}
                >
                Перейти в корзину
            </Link> :
            <a href="#"
                className={styles['drawing__button']}
                onClick={this.onAddToCartClick}
                >
                Добавить в корзину
            </a>
        const { drawing, dispatch } = this.props
        return (
            <div className={styles['drawing']}>
                <h3 className={styles['header']}>
                    <Link
                        to={ "/drawing/" + drawing._id }
                        activeClassName={styles['header__link--clicked']}
                        className={styles['header__link']}
                        >
                        {drawing.title}
                    </Link>
                </h3>
                <div className={styles['drawing-row']}>
                    <div className={styles['drawing-col'] + " " + styles['drawing-col-1']}>
                        <img
                            href="#"
                            src={drawing.picture ?
                                `/pics/${drawing.picture}?dim=300x300` :
                                'http://placehold.it/200x200'}
                            alt={'picture ' + drawing.title}
                            onClick={this.onPictureClick}
                            className={styles['drawing__image']}
                            />

                    </div>
                    <div className={styles['drawing-col'] + " " + styles['drawing-col-2']}>
                        <p><strong>Цена: </strong>{drawing.price} рублей</p>
                        <p><strong>Состав: </strong>{drawing.drawing_composition}</p>
                        <p><strong>Описание: </strong>{drawing.description}</p>
                        { cartButton }
                    </div>
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
