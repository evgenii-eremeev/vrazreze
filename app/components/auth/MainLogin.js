import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoginForm from './LoginForm';
import { attemptLogin, navigatedAwayFromAuthFormPage } from '../../actions/authActions';


const MainLogin = React.createClass({

    transferToDashboardIfLoggedIn(){
        if (this.props.userAuthSession.isLoggedIn){
            this.props.dispatch(push('/'));
        }
    },

    componentWillMount() {
        this.transferToDashboardIfLoggedIn();
    },

    componentDidUpdate() {
        this.transferToDashboardIfLoggedIn();
    },

    componentWillUnmount() {
        this.props.dispatch(navigatedAwayFromAuthFormPage());
    },

    render () {
        const { dispatch, userAuthSession } = this.props;

        return (
            <LoginForm onClickLogin={(formData) => {
                    dispatch(attemptLogin(formData.email, formData.password))
                }}
                isFetchingData={userAuthSession.fetchingAuthUpdate}
                serverError={userAuthSession.error}
                />
        );
    }
});

function mapStateToProps(state) {
    return {
        userAuthSession: state.userAuthSession
    };
}

export default connect(mapStateToProps)(MainLogin);
