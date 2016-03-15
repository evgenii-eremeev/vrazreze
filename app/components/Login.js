import React, { PropTypes } from 'react';
import { Input, Button } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const Login = React.createClass({

    onLoginSubmit (e) {
        e.preventDefault();
        const { dispatch } = this.props;
        $.ajax({
            type: "POST",
            url: '/login',
            data: $("#loginForm").serialize(),
            success: function (user) {
                console.log("Login!");
                sessionStorage.username = user.username;
                sessionStorage._id = user._id;
                $("#loginForm")[0].reset();
                window.location = '/';
                // use this than redux will be added
                // dispatch(push('/'));
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
});

export default connect()(Login);
