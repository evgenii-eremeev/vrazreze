import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import SignUpForm from './SignUpForm';
import { attemptSignUp, navigatedAwayFromAuthFormPage } from '../../actions/authActions';

const MainSignUp = React.createClass({

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
            <SignUpForm onClickSignUp={(formData) => {
                    dispatch(attemptSignUp(
                        formData.email,
                        formData.password,
                        formData.displayName
                    ))
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

export default connect(mapStateToProps)(MainSignUp);
