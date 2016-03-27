import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { validateCategoryUrl } from '../../utils/regexValidators';

const initialFormState = {
    errorMessage: null,
    isNameFieldIncorrect: false,
    isUrlFieldIncorrect: false
};

const EditCategory = React.createClass({

    getInitialState() {
        return Object.assign(
            {},
            initialFormState,
            { showModal: false }
        );
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
        const { category, onUpdateClick } = this.props;
        const formData = {
            position : this.refs.position.value.trim(),
            name : this.refs.name.value.trim(),
            url : this.refs.url.value.trim()
        };

        let newState = this.findErrorsInEditForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            onUpdateClick(category._id, formData);
        }
    },

    handleOnDeleteClick () {
        const { category, onDeleteClick } = this.props;
        let confirmed = confirm("Точно? Восстановить нельзя ведь будет.");
        if (confirmed) {
            onDeleteClick(category._id);
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
                    <span className="glyphicon glyphicon-pencil"></span>
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить категорию</Modal.Title>
                        <p><small>id: { category._id }</small></p>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label className="control-label">Позиция</label>
                            <input className="form-control" type="number" ref="position" defaultValue={category.position}/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isNameFieldIncorrect)}>
                            <label className="control-label">Название</label>
                            <input className="form-control" type="text" ref="name" defaultValue={category.name}/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isUrlFieldIncorrect)}>
                            <label className="control-label">Ссылка</label>
                            <input className="form-control" type="text" ref="url" defaultValue={category.url}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="pull-left">
                            {loader}
                            {errorLabel}
                        </div>
                        <Button onClick={this.handleOnEditClick} bsStyle="primary">Сохранить</Button>
                        <Button onClick={this.handleOnDeleteClick} bsStyle="danger">Удалить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
})

export default EditCategory;
