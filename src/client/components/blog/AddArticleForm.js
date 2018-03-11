import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import bemto from 'bemto-components';
import { addArticle } from '../../ducks/articles';

class AddArticleForm extends Component {
  state = {
      title: '',
      body: '',
  };

  handleChange = field => (ev) => {
      this.setState({
          [field]: ev.target.value,
      });
  };

  handleSubmit = (ev) => {
      ev.preventDefault();
      this.props.addArticle({
          ...this.state,
          author: this.props.user,
      });

      this.setState({
          title: '',
          body: '',
      });
  };

  render() {
      return (
          <AddArticleFormStyled>
              <form className="form" onSubmit={this.handleSubmit}>
                  <div>
                      <input className="field" value={this.state.title} onChange={this.handleChange('title')}/>
                  </div>
                  <div>
                      <textarea className="field" value={this.state.body} onChange={this.handleChange('body')}/>
                  </div>
                  <div>
                      <input type="submit"/>
                  </div>
              </form>
          </AddArticleFormStyled>
      );
  }
}

AddArticleForm.propTypes = {
    addArticle: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
};

export default connect(
    (state) => {
        const { auth } = state;

        return {
            user: auth.user,
        };
    },
    { addArticle },
)(AddArticleForm);

/* styles */
const AddArticleFormStyled = styled(bemto({}))`
margin-bottom: 15px;

.form{
    width: 100%;
    background: #fafafa;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
}

.field{
    width: 100%;
    margin-bottom: 10px;
    border-radius: 3px;
    border: 1px solid lightgray;
}
`;

