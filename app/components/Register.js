import React, { PropTypes } from 'react';

import { Input, Button } from 'react-bootstrap';

const Register = React.createClass({
    onRegisterSubmit (e) {
        e.preventDefault();
        // $.ajax({
        //     type: "POST",
        //     url: '/register',
        //     data: $("#registerForm").serialize(),
        //     success: function (data) {
        //         console.log("Registered!");
        //     }
        // });
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/register');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send($("#registerForm").serialize());
    },
    render () {
        return (
            <div className="container">
                <h1>Регистрация</h1>
                <br />
                <form id="registerForm" method="post" onSubmit={this.onRegisterSubmit} style={{maxWidth: '300'}} >
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
