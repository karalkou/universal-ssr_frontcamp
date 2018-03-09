import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import PageContainer from './common/PageContainer';
import ProtectedRoute from './common/ProtectedRoute';
import StartPage from './routes/Start';
import AdminPage from './routes/Admin';
import AuthPage from './routes/Auth';

class App extends Component {
    static propTypes = {};

    render() {
        return (
            <PageContainer>
                <ul style={{ margin: 0, padding: 0 }}>
                    <li><NavLink exact to="/" activeStyle={{ color: 'red' }}>start page</NavLink></li>
                    <li><NavLink exact to="/admin" activeStyle={{ color: 'red' }}>admin page</NavLink></li>
                    <li><NavLink exact to="/auth" activeStyle={{ color: 'red' }}>auth page</NavLink></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={StartPage} />
                    <ProtectedRoute path="/admin" component={AdminPage} />
                    <Route path = "/auth" component = {AuthPage}/>
                </Switch>
            </PageContainer>
        );
    }
}

export default App;
