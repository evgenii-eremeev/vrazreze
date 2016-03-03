import React, { PropTypes } from 'react';

import { Input, Button } from 'react-bootstrap';

const Login = React.createClass({
    onLoginSubmit (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/login',
            data: $("#loginForm").serialize(),
            success: function (data) {
                console.log("Login!");
                $("#loginForm")[0].reset();
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
