import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { validateCategoryUrl } from '../../utils/regexValidators';

const initialFormState = {
    errorMessage: null,
    isNameFieldIncorrect: false,
    isUrlFieldIncorrect: false
};

const AddCategory = React.createClass({

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
        const { categories } = this.props;
        if (formData.name === "") {
            newState.errorMessage = "Наименование не может быть пустым";
            newState.isNameFieldIncorrect = true;
        }
        // is name unique?
        else if (!categories.items.every(c => c.name !== formData.name)) {
            newState.errorMessage = "Наименование не может повторяться";
            newState.isNameFieldIncorrect = true;
        }
        else if (formData.url === "") {
            newState.errorMessage = "Ссылка не может быть пустой";
            newState.isUrlFieldIncorrect = true;
        }
        // is url unique?
        else if (!categories.items.every(c => c.url !== formData.url)) {
            newState.errorMessage = "Ссылка не может повторяться";
            newState.isUrlFieldIncorrect = true;
        }
        // is category url contains valid symbols?
        else if (!validateCategoryUrl(formData.url)) {
            newState.errorMessage = "Ссылка может состоять из символов: a-z A-z 0-9 _ . -";
            newState.isUrlFieldIncorrect = true;
        }
        return newState;
    },

    handleOnAddClick () {
        const formData = {
            position : this.refs.position.value.trim(),
            name : this.refs.name.value.trim(),
            url : this.refs.url.value.trim()
        };

        let newState = this.findErrorsInEditForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            // this.props.onAddClick(formData);
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
                    bsStyle="success"
                    bsSize="large"
                    onClick={this.open}
                    >
                    Добавить
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить категорию</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label className="control-label">Позиция</label>
                            <input
                                className="form-control"
                                type="number"
                                ref="position"
                                defaultValue={this.props.categories.items.length}
                                />
                        </div>
                        <div className={this.getInputContainerClass(this.state.isNameFieldIncorrect)}>
                            <label className="control-label">Название</label>
                            <input className="form-control" type="text" ref="name"/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isUrlFieldIncorrect)}>
                            <label className="control-label">Ссылка</label>
                            <input className="form-control" type="text" ref="url"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="pull-left">
                            {loader}
                            {errorLabel}
                        </div>
                        <Button onClick={this.handleOnAddClick} bsStyle="primary">Добавить</Button>
                        <Button onClick={this.close}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
})

export default AddCategory;
