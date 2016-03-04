import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Input, Button } from 'react-bootstrap';

const Login = React.createClass({
    onLoginSubmit (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/login',
            data: $("#loginForm").serialize(),
            success: function (user) {
                console.log("Login!");
                sessionStorage.username = user.username;
                sessionStorage._id = user._id;
                $("#loginForm")[0].reset();
                browserHistory.push('/');
            }
        });
    },
    render () {
        return (
            <div className="container">
                <h1>Вход</h1>
                <br />
                <form role='form' id="loginForm" method="post" style={{maxWidth: 300}} onSubmit={this.onLoginSubmit}>
                    <Input type="text"  name="username" label="Имя пользователя" />
                    <Input type="password" name="password" label="Пароль" />
                    <Button type="submit" bsStyle="primary">Войти</Button>
                </form>
            </div>
        );
    }
})

export default Login;
