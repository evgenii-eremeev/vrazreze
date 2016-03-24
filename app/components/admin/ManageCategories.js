import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import EditCategory from './EditCategory';
import { validateCategoryUrl } from '../../utils/regexValidators';

const initialFormState = {
    serverError: null,
    errorMessage: null,
    isNameFieldIncorrect: false,
    isUrlFieldIncorrect: false
};

const ManageCategories = React.createClass({

    getInitialState() {
        return Object.assign({}, initialFormState);
    },

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    },

    findErrorsInLoginForm(formData) {
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

    onAddCategoryClick() {
        const formData = {
            position : this.refs.position.value.trim(),
            name : this.refs.name.value.trim(),
            url : this.refs.url.value.trim()
        };

        let newState = this.findErrorsInLoginForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            // this.props.onClickLogin(formData);
        }
    },

    render () {
        const { categories } = this.props;
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
        else if(this.state.serverError){
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.state.serverError}</label>
                </div>
            );
        }

        return (
            <div style={{maxWidth: 700, margin: '0 auto', padding: '0 10px'}}>
                <h1>Управление категориями</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: '15%'}}>#</th>
                            <th>Наименование</th>
                            <th>Ссылка</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.items.map((category, idx) => (
                            <tr key={idx}>
                                <td >{ category.position }</td>
                                <td>{ category.name }</td>
                                <td>{ category.url }</td>
                                <td><EditCategory category={category}/></td>
                            </tr>
                        ))}
                        <tr key={99}>
                            <td >
                                <input
                                    className="form-control"
                                    type="number"
                                    ref="position"
                                    value={ categories.items.length }
                                    />
                            </td>
                            <td className={this.getInputContainerClass(this.state.isNameFieldIncorrect)}>
                                <input className="form-control" type="text" ref="name" />
                            </td>
                            <td className={this.getInputContainerClass(this.state.isUrlFieldIncorrect)}>
                                <input className="form-control" type="text" ref="url" />
                            </td>
                            <td>
                                <button
                                    className="btn btn-small btn-success"
                                    onClick={this.onAddCategoryClick}
                                    >
                                    +
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                { errorLabel }
                { loader }
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        categories: state.categories
    };
}

export default connect(mapStateToProps)(ManageCategories);
