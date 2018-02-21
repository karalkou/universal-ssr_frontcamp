import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import bemto from 'bemto-components';
import { addArticle } from '../../ducks/articles';

class AddArticleForm extends Component {
    state = {
        title: '',
        body: ''
    };

    handleChange = field => ev => {
        this.setState({
            [field]: ev.target.value
        });
    };

    handleSubmit = ev => {
        ev.preventDefault();
        this.props.addArticle(this.state);

        this.setState({
            title: '',
            body: '',
        })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input value={this.state.title} onChange={this.handleChange('title')}/>
                </div>
                <div>
                    <textarea value={this.state.body} onChange={this.handleChange('body')}/>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        );
    }
}

AddArticleForm.propTypes = {};
AddArticleForm.defaultProps = {};

export default connect(
    null,
    { addArticle }
)(AddArticleForm);

/* styles */
var AddArticleFormStyled = styled(bemto({}))``;

