import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, signIn, signOut } from '../../ducks/auth';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

class AuthPage extends Component {
    componentWillReceiveProps(nextProps) {
        if (!this.props.auth.authenticated && nextProps.auth.authenticated) {
            this.props.history.push('/auth');
        }
    }

    handleSignIn = ({ email, password }) => this.props.signIn(email, password);
    handleSignUp = ({ email, password }) => this.props.signUp(email, password);

    render() {
        console.log('this.props: ', this.props);

        return (
            <div>
                <h2>Auth page</h2>
                {
                    this.props.auth.authenticated
                        ? <button onClick={this.props.signOut}>sign out</button>
                        : (<ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                            <li style={{ display: 'inline-block', marginRight: '15px' }}>
                                <NavLink to="/auth/signin" activeStyle={{ color: 'red' }}>sign in</NavLink>
                            </li>
                            <li style={{ display: 'inline-block' }}>
                                <NavLink to="/auth/signup" activeStyle={{ color: 'red' }}>sign up</NavLink>
                            </li>
                        </ul>)
                }
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
    signOut: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        const { auth } = state;
        return {
            auth,
        };
    },
    { signUp, signIn, signOut },
)(AuthPage);
