import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { validateEmail } from '../utils/regexValidators';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const Login = React.createClass({

    getInitialState() {
        return {
            errorMessage:  null,
            isEmailFieldIncorrect : false
        };
    },

    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.email).focus();
    },

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    },

    findErrorsInLoginForm(formData) {
        // Checking email
        this.setState({
            errorMessage:  null,
            isEmailFieldIncorrect: false,
            isPasswordFieldIncorrect: false
        });

        if (formData.email === "") {
            this.setState({
                errorMessage: "Нужно ввести e-mail.",
                isEmailFieldIncorrect: true
            });
        }
        else if (!validateEmail(formData.email)) {
            this.setState({
                errorMessage: "Пожалуйста введите правильный e-mail.",
                isEmailFieldIncorrect: true
            });
        }
        else if (formData.password === "") {
            this.setState({
                errorMessage: "Пароль не может быть пустым.",
                isPasswordFieldIncorrect: true
            });
        }
    },

    onLoginClick() {
        const formData = {
            email : this.refs.email.value.trim(),
            password : this.refs.password.value.trim()
        };
        this.findErrorsInLoginForm(formData);
    },

    render () {
        let errorLabel;
        if (this.state.errorMessage) {
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <br />
                    <label className="control-label">{this.state.errorMessage}</label>
                </div>
            );
        }

        return (
            <div className="container">
                <form style={{maxWidth: 400, margin: "0 auto"}}>
                    <h1>Вход</h1>
                    <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
                        <label className="control-label">E-mail</label>
                        <input className="form-control" type="text" ref="email" />
                    </div>
                    <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}>
                        <label className="control-label">Пароль</label>
                        <input className="form-control" type="password" ref="password" />
                    </div>
                    <button onClick={this.onLoginClick} className="btn btn-primary">Войти</button>
                    { errorLabel }
                </form>
            </div>
        );
    }
});

export default connect()(Login);
