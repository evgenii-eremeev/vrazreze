import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Input, Button } from 'react-bootstrap';

const Register = React.createClass({
    onRegisterSubmit (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/register',
            data: $("#registerForm").serialize(),
            success: function (user) {
                console.log("Registered!");
                sessionStorage.username = user.username;
                sessionStorage._id = user._id;
                $("#registerForm")[0].reset();
                window.location = '/';
                // use this than redux will be added
                // browserHistory.push('/');
            }
        });
    },
    render () {
        return (
            <div className="container">
                <h1>Регистрация</h1>
                <br />
                <form role='form' id="registerForm" method="post" onSubmit={this.onRegisterSubmit} style={{maxWidth: '300'}} >
                    <Input type="text"  name="username" label="Имя пользователя" />
                    <Input type="password" name="password" label="Пароль" />
                    <Button type="submit" bsStyle="primary">
                            Зарегистрироваться
                    </Button>
                </form>
            </div>
        );
    }
})

export default Register;
