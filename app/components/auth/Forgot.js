import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

class Forgot extends React.Component {

    constructor(props) {
        super(props);
        this._reset = this._reset.bind(this);
        this.state = {
            message: ""
        };
    }

    _reset() {
        const email = this.refs.email.value.trim();

        $.ajax({
            url: '/forgot',
            type: "POST",
            data: { email },
            success: () => {
                this.setState({
                    message: "Вам выслано письмо на указанный адрес."
                });
            },
            error: (xhr) => {
                if (xhr.status === 404) {
                    this.setState({ message: xhr.responseText });
                } else {
                    console.log('error jqxhr:', xhr)
                }
            }
        });

    }

    render() {
        return(
            <div style={{maxWidth: 400, margin: "0 auto"}}>
                <h1>Сброс пароля</h1>
                <div className="form-group">
                    <label className="control-label">E-mail</label>
                    <input className="form-control" type="text" ref="email"/>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={this._reset}
                    >
                    Сбросить
                </button>
                <br />
                {this.state.message}
            </div>
        )
    }
}

export default Forgot;
