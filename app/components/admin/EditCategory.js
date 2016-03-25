import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

const initialFormState = {
    errorMessage: null,
    isNameFieldIncorrect: false,
    isUrlFieldIncorrect: false,
    showModal: false
};
// TODO fields don't changes
const EditCategory = React.createClass({

    getInitialState() {
        return Object.assign({}, initialFormState);
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

    findErrorsInEditForm(formData) {
        let newState = Object.assign({}, initialFormState);
        const { categories } = this.props;
        if (formData.name === "") {
            newState.errorMessage = "Наименование не может быть пустым";
            newState.isNameFieldIncorrect = true;
        }
        else if (formData.url === "") {
            newState.errorMessage = "Ссылка не может быть пустой";
            newState.isUrlFieldIncorrect = true;
        }
        // is category url contains valid symbols?
        else if (!validateCategoryUrl(formData.url)) {
            newState.errorMessage = "Ссылка может состоять из символов: a-z A-z 0-9 _ . -";
            newState.isUrlFieldIncorrect = true;
        }
        return newState;
    },

    handleOnEditClick () {
        const formData = {
            position : this.refs.position.value.trim(),
            name : this.refs.name.value.trim(),
            url : this.refs.url.value.trim()
        };

        let newState = this.findErrorsInEditForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            this.props.onClickEdit(formData);
        }
    },

    render () {
        const { category } = this.props;

        let errorLabel;
        let loader;

        if (this.props.isFetchingData){
            loader = <p>Секунду...</p>;
        }

        if (this.state.errorMessage) {
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.state.errorMessage}</label>
                </div>
            );
        }
        else if(this.props.serverError){
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.props.serverError}</label>
                </div>
            );
        }
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
                        <p><small>id: { category._id }</small></p>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
                            <label className="control-label">Позиция</label>
                            <input className="form-control" type="number" ref="position" value={category.position}/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
                            <label className="control-label">Название</label>
                            <input className="form-control" type="text" ref="name" value={category.name}/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}>
                            <label className="control-label">Ссылка</label>
                            <input className="form-control" type="text" ref="url" value={category.url}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {loader}
                        {errorLabel}
                        <Button onClick={this.handleOnEditClick} bsStyle="primary">Сохранить</Button>
                        <Button onClick={this.close}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
})

export default EditCategory;
