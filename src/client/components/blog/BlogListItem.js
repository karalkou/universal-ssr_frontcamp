import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import bemto from 'bemto-components';

class BlogListItem extends Component {

    render() {
        const { item: {title, body, author, id}, onClick } = this.props;

        return (
            <BlogListItemStyled
                __del={ <span onClick={onClick}>X</span>}
                __title={ `${title}` }
                __body={ `${body ? body: ''}` }
                __author={ `${author}` }
            />
        );
    }
}

BlogListItem.propTypes = {};
BlogListItem.defaultProps = {};

export default BlogListItem;

/* styles */
var BlogListItemStyled = styled(bemto({
    content: [
        {
            elem: 'del',
        },
        {
            elem: 'title',
        },
        {
            elem: 'body',
        },
        {
            elem: 'author',
        }
    ]
}))`
position: relative;
padding: 15px;
list-style: none;
background-color: white;
&:not(:last-child){
  margin-bottom: 15px;
}

&__del{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
}

&__title{
  font-size: 18px;
  margin-bottom: 15px;
}

&__body{
  margin-bottom: 15px;
}

&__author{
  font-size: 14px;
  font-weight: bold;
}

@media (min-width: 961px) {
    &:hover{
      background-color: #f5f8fa;
    }
    &__del:hover{
      color: #1DA1F2;
      cursor: pointer;
    }
}
`;


