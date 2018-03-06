import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import StartPage from './routes/Start';
import AdminPage from './routes/Admin';
// import AuthPage from './routes/Auth';

class App extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <ul style={{margin: 0, padding: 0}}>
                    <li><NavLink exact to='/' activeStyle = {{color: 'red'}}>start page</NavLink></li>
                    <li><NavLink exact to='/admin' activeStyle = {{color: 'red'}}>admin page</NavLink></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={StartPage}/>
                    <Route path="/admin" component={AdminPage}/>
                    {/* <Route path = '/auth' component = {AuthPage}/> */}
                </Switch>
            </div>
        );
    }
}

export default App;
