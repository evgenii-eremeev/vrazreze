import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { validateEmail } from '../../utils/regexValidators';

const initialFormState = {
      errorMessage:  null,
      isEmailFieldIncorrect : false,
      isPasswordFieldIncorrect : false,
      isConfirmPasswordFieldIncorrect : false
};

const SignUpForm = React.createClass({

    getInitialState() {
        return Object.assign({}, initialFormState);
    },

    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.email).focus();
    },

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    },

    findErrorsInSignupForm(formData) {
        // Only finding one error at a time.
        let newState = Object.assign({}, initialFormState);

        // Checking email
        if (formData.email === "") {
            newState.errorMessage = "E-mail не может быть пустым.";
            newState.isEmailFieldIncorrect = true;
        }
        else if (!validateEmail(formData.email)) {
            newState.errorMessage = "Пожалуйста введите правильный e-mail.";
            newState.isEmailFieldIncorrect = true;
        }
        // Checking password
        else if (formData.password === "") {
            newState.errorMessage = "Password is required";
            newState.isPasswordFieldIncorrect = true;
        }
        // Checking confirmed password
        else if (formData.confirmedPassword === "") {
            newState.errorMessage = "Пароль не может быть пустым.";
            newState.isConfirmPasswordFieldIncorrect = true;
        }
        else if (formData.confirmedPassword !== formData.password) {
            newState.errorMessage = "Пароли не совпадают.";
            newState.isConfirmPasswordFieldIncorrect = true;
            newState.isPasswordFieldIncorrect = true;
        }

        return newState;
    },

    handleOnClickSignUp(){
        var formData = {
            email : this.refs.email.value.trim(),
            password : this.refs.password.value,
            confirmedPassword : this.refs.confirmPassword.value,
            displayName: this.refs.displayName.value.trim()
        }

        let newState = this.findErrorsInSignupForm(formData);
        this.setState(newState);

        if (!newState.errorMessage) {
            this.props.onClickSignUp(formData);
        }
    },

    render () {
        let loader; //TODO implement a better loader
        let errorLabel;
        if (this.props.isFetchingData) {
            loader = <p>Секунду...</p>;
        }
        //TODO create a "FormErrorMessage" component
        if (this.state.errorMessage) {
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.state.errorMessage}</label>
                </div>
            );
        }
        else if (this.props.serverError) {
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.props.serverError}</label>
                </div>
            );
        }

        return (
            <div style={{maxWidth: 400, margin: "0 auto"}}>
                <h1>Регистрация</h1>
                <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}>
                    <label className="control-label">Имя</label>
                    <input className="form-control" type="text" ref="displayName" />
                </div>
                <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
                    <label className="control-label">E-mail</label>
                    <input className="form-control" type="text" ref="email"/>
                </div>
                <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}>
                    <label className="control-label">Пароль</label>
                    <input className="form-control" type="password" ref="password" />
                </div>
                <div className={this.getInputContainerClass(this.state.isConfirmPasswordFieldIncorrect)}>
                    <label className="control-label">Подтвердите пароль</label>
                    <input className="form-control" type="password" ref="confirmPassword" />
                </div>
                <button className="btn btn-primary" onClick={this.handleOnClickSignUp}>Зарегистрироваться</button>
                { loader }
                { errorLabel }
            </div>
        );
    }
})

export default SignUpForm;
