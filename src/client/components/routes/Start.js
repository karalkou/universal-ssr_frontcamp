import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Start extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <h2>You can access admin page only in case of authentication and authorization</h2>
                <p>
                    To do that, please&nbsp;
                    <NavLink to="/auth/signin" activeStyle={{ color: 'red' }}>sign in</NavLink>
                    &nbsp;or&nbsp;
                    <NavLink to="/auth/signup" activeStyle={{ color: 'red' }}>sign up</NavLink>
                </p>
                <p>
                    If you try to access admin page without actions that were listed above you will
                    be <b>redirected</b> to the&nbsp;
                    <b><NavLink to="/auth" activeStyle={{ color: 'red' }}>authorization page</NavLink></b>
                </p>
            </div>
        );
    }
}

export default Start;
