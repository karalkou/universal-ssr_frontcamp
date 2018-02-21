import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import bemto from 'bemto-components';

class PageContainer extends Component {
    render() {
        return (
            <PageContainerStyled>
                {this.props.children}
            </PageContainerStyled>
        );
    }
}

PageContainer.propTypes = {};
PageContainer.defaultProps = {};

export default PageContainer;

var PageContainerStyled = styled(bemto({}))`
width: 100%;
max-width: 960px;
margin: 0 auto;
padding: 15px 0;

@media (max-width: 960px) {
    background: lightgoldenrodyellow;
  }
`;