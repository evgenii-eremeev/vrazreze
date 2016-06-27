import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { validateEmail } from '../../utils/regexValidators';

const initialFormState = {
      errorMessage:  null,
      isEmailFieldIncorrect : false,
      isPasswordFieldIncorrect : false
};

const LoginForm = React.createClass({

    getInitialState() {
        return Object.assign({}, initialFormState);
    },

    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.email).focus();
    },

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    },

    findErrorsInLoginForm(formData) {
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

    handleOnLoginClick() {
        const formData = {
            email : this.refs.email.value.trim(),
            password : this.refs.password.value
        };

        let newState = this.findErrorsInLoginForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            this.props.onClickLogin(formData);
        }
    },

    render () {
        let errorLabel;
        let loader;

        if (this.props.isFetchingData){
            loader = <p>Секунду...</p>;
        }

        if (this.state.errorMessage) {
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.state.errorMessage}</label>
                </div>
            );
        }
        else if(this.props.serverError){
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.props.serverError}</label>
                </div>
            );
        }

        return (
            <div style={{maxWidth: 400, margin: "0 auto"}}>
                <h1>Вход</h1>
                <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
                    <label className="control-label">E-mail</label>
                    <input className="form-control" type="text" ref="email" />
                </div>
                <Link to='/forgot' className="pull-right">Забыли пароль?</Link>
                <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}>
                    <label className="control-label">Пароль</label>
                    <input className="form-control" type="password" ref="password" />
                </div>
                <button
                    onClick={this.handleOnLoginClick}
                    className="btn btn-primary"
                    >
                    Войти
                </button>
                <br />
                { errorLabel }
                { loader }
            </div>
        );
    }
});

export default LoginForm;
