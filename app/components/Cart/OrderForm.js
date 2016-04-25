import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { validateEmail } from '../../utils/regexValidators';

const initialFormState = {
      errorMessage:  null,
      isEmailFieldIncorrect : false
};

const OrderForm = React.createClass({

    getInitialState() {
        return Object.assign({}, initialFormState);
    },

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    },

    findErrorsInOrderForm(formData) {
        let newState = Object.assign({}, initialFormState);

        if (formData.email === "") {
            newState.errorMessage = "E-mail не может быть пустым.";
            newState.isEmailFieldIncorrect = true;
        }
        else if (!validateEmail(formData.email)) {
            newState.errorMessage = "Пожалуйста введите правильный e-mail.";
            newState.isEmailFieldIncorrect = true;
        }
        return newState;
    },

    onOrderClick () {
        const formData = {
            email : this.refs.email.value.trim(),
            displayName : this.refs.displayName.value.trim()
        };
        const { cart } = this.props;
        let newState = this.findErrorsInOrderForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            this.sendOrderForm(formData, cart);
        }
    },

    sendOrderForm (formData, cart) {
        fetch('/mail/order', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: formData.email,
                displayName: formData.displayName,
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
        let errorLabel;

        if (this.state.errorMessage) {
            errorLabel = (
                <div className={this.getInputContainerClass(true) + " pull-left"}>
                    <label className="control-label">{this.state.errorMessage}</label>
                </div>
            );
        }
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
                    <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
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
                    { errorLabel }
                    <Button
                        bsStyle="success"
                        onClick={this.onOrderClick}
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
