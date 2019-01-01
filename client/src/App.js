import React, { Component } from 'react';
import { Route,Redirect } from 'react-router-dom'
import Signup from './Component/Signup.jsx';
import Login from './Component/Login.jsx';
import Detail from './Component/index.jsx';

const index = () => {
    if (localStorage.getItem('token') !== (undefined ||null)) {
        return(
          <Detail />
        );
    }else {
        return(
            <Redirect
             to='/Signup' />
            );

    }
}

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Detail} />
      </div>
    );
  }
}

export default App;
