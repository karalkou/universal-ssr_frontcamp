import React, { Component } from 'react';
import PageContainer from '../common/PageContainer';
import AddArticleForm from '../blog/AddArticleForm';
import BlogListFiltrationPanel from '../blog/BlogListFiltrationPanel';
import BlogList from '../blog/BlogList';

class Start extends Component {
    static propTypes = {};

    render() {
        return (
            <PageContainer>
                <h2>Start Page</h2>
                <AddArticleForm/>
                <BlogListFiltrationPanel/>
                <BlogList/>
            </PageContainer>
        )
    }
}

export default Start;