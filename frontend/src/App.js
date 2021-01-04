// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Login from './components/Login';
import Updates from './components/Updates';
import MakeAccount from './components/MakeAccount';
import ChangeInfo from './components/ChangeInfo';
import PreviousDays from './components/PreviousDays';
import SpecificDay from './components/SpecificDay';
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true;
  const location = useLocation()
  const [ loggedin, setlog ] = useState((location.pathname==="/login" || location.pathname==="/makeaccount")? false: true);
  const [ message, setmessage ] = useState("");
  // const [ daypath, setdaypath ] = useState("");

  function checklog(status){
    setlog(status);
  }

  function addmessage(m){
    setmessage(m);
  }

  useEffect(() =>{
    //Give a second or so timeout for loading page - do this for all api calls
    let isMounted = true;
    axios.get('http://localhost:8080/user/homepage/')
            .then(res => {
                setlog(true);
            })
            .catch(err => {if (err.response){
                setlog(false);
            }})
    return () => { isMounted = false };
  }, [])

  // useEffect(() =>{
  //   axios.get('http://localhost:8080/user/homepage/')
  //           .then(res => {
  //               setlog(true);
  //           })
  //           .catch(err => {if (err.response){
  //               setlog(false);
  //           }})
  // }, [message])

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          loggedin ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    )
  }

  const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          !loggedin ? (
            <Component {...props} {...rest}/>
          ) : (
            <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
          )
        }
      />
    )
  }

  return (
    <main>
      <Switch>
      <Route path="/" component={Main} exact />
      <PrivateRoute changeStatus={checklog} addmessage={addmessage} path="/home" component={Home} />
      <PublicRoute changeStatus={checklog} addmessage={addmessage} path="/login" component={Login} />
      {/* <Route path="/makeaccount" component={MakeAccount} /> */}
      {/* <Route path="/makeaccount" render={(props) => <MakeAccount changeStatus={checklog} addmessage={addmessage} {...props} />} /> */}
      <PublicRoute changeStatus={checklog} addmessage={addmessage} path="/makeaccount" component={MakeAccount} />
      <PrivateRoute changeStatus={checklog} addmessage={addmessage} path="/updates" component={Updates} />
      <PrivateRoute changeStatus={checklog} addmessage={addmessage} path="/previousdays/:day" component={SpecificDay} />
      <PrivateRoute changeStatus={checklog} addmessage={addmessage} path="/previousdays" component={PreviousDays} />
      <PrivateRoute changeStatus={checklog} addmessage={addmessage} path="/changeinfo" component={ChangeInfo} />
      {/* <Route path="/changeinfo" component={ChangeInfo} /> */}
      <Route component={Error} />
      {/* maybe add a route for everything else thatll send do main */}
      </Switch>
      <p>{message}</p>
    </main>
  );
}

export default App;
