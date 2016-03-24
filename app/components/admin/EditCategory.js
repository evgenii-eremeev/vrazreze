import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditCategory = React.createClass({

    getInitialState() {
        return { showModal: false };
    },

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render () {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.open}
                    >
                    Edit
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить категорию</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
                            <label className="control-label">E-mail</label>
                            <input className="form-control" type="text" ref="email" value={this.props.category.name}/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}>
                            <label className="control-label">Пароль</label>
                            <input className="form-control" type="text" ref="password" value={this.props.category.url}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
})

export default EditCategory;
