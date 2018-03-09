import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSelector } from '../../ducks/auth';

class ProtectedRoute extends Component {
    render() {
        const { component, ...rest } = this.props;
        return <Route {...rest} render={this.renderRoute} />;
    }

    renderRoute = (...args) => {
        const { authorized } = this.props;
        const AuthorizedComponent = this.props.component;
        return authorized ? <AuthorizedComponent {...args} /> : <Redirect to="/auth" />;
    }
}

ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    authorized: PropTypes.bool.isRequired,
};

export default connect(state => ({
    authorized: !!userSelector(state),
}), null, null, { pure: false })(ProtectedRoute);
