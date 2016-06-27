import React, { PropTypes } from 'react';

class Reset extends React.Component {

    constructor(props) {
        super(props);
        this._change = this._change.bind(this);
        this.state = {
            message: ""
        };
    }

    _change() {
        const password = this.refs.password.value;
        const { token } = this.props.params;

        $.ajax({
            url: '/reset/' + token,
            type: "POST",
            data: { password },
            success: (message) => {
                this.setState({ message });
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
                <h1>Новый пароль</h1>
                <div className="form-group">
                    <label className="control-label">Пароль</label>
                    <input className="form-control" type="password" ref="password"/>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={this._change}
                    >
                    Изменить
                </button>
                <br />
                {this.state.message}
            </div>
        )
    }
}

export default Reset;
