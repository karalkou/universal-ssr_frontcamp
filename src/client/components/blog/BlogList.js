import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import bemto from 'bemto-components';
import { connect } from 'react-redux';
import { loadAllArticles, removeArticle } from '../../ducks/articles';
import BlogListItem from './BlogListItem';
import { mapToArr } from "../../utils";

class BlogList extends Component {

    componentDidMount(){
        const { list, loadAllArticles } = this.props;
        if ( !list.length ) {
            loadAllArticles();
        }
    }

    onClick = (id) => (ev) => {
        this.props.removeArticle(id);
    };

    render() {
        const { list } = this.props;

        const listItems = list.map((item) => {
            return (
                <BlogListItem
                    key={item.id}
                    item={item}
                    onClick={this.onClick(item.id)}
                />
            );
        });

        return (
            <BlogListStyled>
                {listItems}
            </BlogListStyled>
        );
    }
}

export default connect(
    (state) => {
        console.log('state: ', state);
        const { filters } = state;
        const list = mapToArr(state.articles.entities);
        const { byAuthorAlphabet: { direction, isSorted } } = filters;

        let filteredArticles;

        if ( isSorted ) {
            filteredArticles = [...list].sort((a, b) => {
                if (direction === 1) {
                    if (a.author.toLowerCase() < b.author.toLowerCase()) return -1;
                    if (a.author.toLowerCase() > b.author.toLowerCase()) return 1;
                } else if (direction === -1) {
                    if (a.author.toLowerCase() < b.author.toLowerCase()) return 1;
                    if (a.author.toLowerCase() > b.author.toLowerCase()) return -1;
                }
            });

            return {
                list: filteredArticles
            }
        }

        return {
            list
        }
    },
    { loadAllArticles, removeArticle}
)(BlogList);

/* styles */
var BlogListStyled = styled(bemto('ul', {}))`
padding: 0;
margin: 0;
`;