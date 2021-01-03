// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Login from './components/Login';
import MakeAccount from './components/MakeAccount';
import ChangeInfo from './components/ChangeInfo';

function App() {
  const [ loggedin, setlog ] = useState(false);

  function checklog(){
    //if statement
    setlog(prevStatus => !prevStatus)
  }

  useEffect(() =>{
    //if statement
    //check if logged in
  }, [])

  return (
    <main>
      <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/makeaccount" component={MakeAccount} />
      <Route path="/changeinfo" component={ChangeInfo} />
      <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
