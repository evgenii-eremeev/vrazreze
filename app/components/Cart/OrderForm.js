import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const OrderForm = React.createClass({

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    },

    onOrderClickHandler () {
        const { cart } = this.props;
        fetch('/mail/order', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: this.refs.email.value.trim(),
                displayName: this.refs.displayName.value.trim(),
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
        const { userAuthSession } = this.props;
        const user = userAuthSession.isLoggedIn ?
            userAuthSession.userObject : {}
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.closeOrderForm}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Оформление заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={this.getInputContainerClass(false)}>
                        <label className="control-label">Имя</label>
                        <input
                            className="form-control"
                            type="text"
                            ref="displayName"
                            defaultValue={user.displayName}
                            />
                    </div>
                    <div className={this.getInputContainerClass(false)}>
                        <label className="control-label">E-mail</label>
                        <input
                            className="form-control"
                            type="text"
                            ref="email"
                            defaultValue={user.username}
                            />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="success"
                        onClick={this.onOrderClickHandler}
                        >
                        Отправить запрос
                    </Button>
                    <Button onClick={this.props.closeOrderForm}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

function mapStateToProps(state) {
    return {
        userAuthSession: state.userAuthSession,
        cart: state.cart
    };
}

export default connect(mapStateToProps)(OrderForm);
