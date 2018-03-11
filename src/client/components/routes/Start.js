import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../ducks/auth';

class Start extends Component {
    static propTypes = {};

    getContent() {
        if (this.props.auth.authenticated) {
            return (<div>
                <h2>You are authorized</h2>
                <button onClick={this.props.signOut}>sign out</button>
            </div>);
        }

        return (<div>
            <h2>
                You can access admin page only in case
                of authentication and authorization
            </h2>
            <p>
                To do that, please&nbsp;
                <NavLink to="/auth/signin" activeStyle={{ color: 'red' }}>sign in</NavLink>
                &nbsp;or&nbsp;
                <NavLink to="/auth/signup" activeStyle={{ color: 'red' }}>sign up</NavLink>
            </p>
            <p>
                If you try to access admin page without
                actions that were listed above you will
                be <b>redirected</b> to the&nbsp;
                <b>
                    <NavLink to="/auth" activeStyle={{ color: 'red' }}>authorization page</NavLink>
                </b>
            </p>
        </div>);
    }

    render() {
        return (
            <div>
                {this.getContent()}
            </div>
        );
    }
}


Start.propTypes = {
    signOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        const { auth } = state;
        return {
            auth,
        };
    },
    { signOut },
)(Start);
