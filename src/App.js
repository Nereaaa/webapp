import React from 'react';
import './App.css';

import Productos from './containers/Productos'
import Pedidos from './containers/Pedidos'
import SignUp from './containers/SignUp/SignUp'
import Login from "./containers/Login/Login";


import { Route, Switch, Redirect } from 'react-router-dom';

export const AppContext = React.createContext(null);

class App extends React.Component {

    state = {
        auth: false,
        authData: {}
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log('token', token)
        if (token != null) {
            this.setState({
                auth: true,
                authData: { ...token }
            })
        }
    }


    setAuthentication = (auth,data) => {
        this.setState({
            auth: auth,
            authData: data
        })
    }

    logoutUser = () => {
        this.setState({
            auth: false,
            authData: {}
        })
        localStorage.removeItem('token')
    }

    render() {
    return (
        <AppContext.Provider value={{app: this}}>
            
            <div className="App">
                <Switch>
                    <Route exact path='/productos'
                           render={(props) => <Productos{...props} autenticado={this.state.auth} logout={this.logoutUser} email={this.state.authData.email}/>}  />       
                    <Route path='/pedidos'
                           render={(props) => <Pedidos{...props} autenticado={this.state.auth} logout={this.logoutUser} email={this.state.authData.email} userId={this.state.authData.localId}/>}  />
                    <Route exact path='/registro'
                           render={(props) => <SignUp{...props} autenticado={this.state.auth} setAuthentication={this.setAuthentication}/>} />
                    <Route exact path='/login'
                           render={(props) => <Login{...props} autenticado={this.state.auth} setAuthentication={this.setAuthentication}/>} />
                    <Redirect from="/" to='/productos' />
                </Switch>
            </div>
        </AppContext.Provider>
    );
  }
}

export default App;
