import React, { PropTypes } from 'react';

import { Input, Button } from 'react-bootstrap';

const Login = React.createClass({
    onLoginSubmit (e) {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/login');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send($("#loginForm").serialize());
    },
    render () {
        return (
            <div className="container">
                <h1>Вход</h1>
                <br />
                <form id="loginForm" method="post" style={{maxWidth: '300'}} onSubmit={this.onLoginSubmit}>
                    <Input type="text"  name="username" label="Имя пользователя" />
                    <Input type="password" name="password" label="Пароль" />
                    <Button type="submit" bsStyle="primary">Войти</Button>
                </form>
            </div>
        );
    }
})

export default Login;
