import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

class SignIn extends Component {
    render() {
        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        email: <Field name="email" component="input" type="text"/>
                    </div>
                    <div>
                        password: <Field name="password" component="input" type="password"/>
                    </div>
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'auth',
})(SignIn);
