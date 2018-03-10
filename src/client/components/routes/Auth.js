import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, signIn } from '../../ducks/auth';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

class AuthPage extends Component {
    handleSignIn = ({ email, password }) => this.props.signIn(email, password);
    handleSignUp = ({ email, password }) => this.props.signUp(email, password);

    render() {
        return (
            <div>
                <h2>Auth page</h2>
                <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                    <li style={{ display: 'inline-block', marginRight: '15px' }}>
                        <NavLink to="/auth/signin" activeStyle={{ color: 'red' }}>sign in</NavLink>
                    </li>
                    <li style={{ display: 'inline-block' }}>
                        <NavLink to="/auth/signup" activeStyle={{ color: 'red' }}>sign up</NavLink>
                    </li>
                </ul>
                <Route path="/auth/signin" render={
                    () => <SignIn onSubmit={this.handleSignIn} />
                } />
                <Route path="/auth/signup" render={
                    () => <SignUp onSubmit={this.handleSignUp} />
                } />
            </div>
        );
    }
}

AuthPage.propTypes = {
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
};

export default connect(null, { signUp, signIn })(AuthPage);
