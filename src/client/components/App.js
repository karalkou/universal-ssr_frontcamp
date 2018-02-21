import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StartPage from './routes/Start';
import AdminPage from './routes/Admin';

class App extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <Route path='/' component={StartPage}/>
                <Route path='/admin' component={AdminPage}/>
            </div>
        )
    }
}

export default App;
