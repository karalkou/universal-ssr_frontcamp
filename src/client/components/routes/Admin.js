import React, { Component } from 'react';
import AddArticleForm from '../blog/AddArticleForm';
import BlogListFiltrationPanel from '../blog/BlogListFiltrationPanel';
import BlogList from '../blog/BlogList';

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <AddArticleForm/>
                <BlogListFiltrationPanel/>
                <BlogList/>
            </div>
        );
    }
}

export default Admin;
