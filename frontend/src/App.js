// import logo from './logo.svg';

// Importing neccessary modules
import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Login from './components/Login';
import Updates from './components/Updates';
import MakeAccount from './components/MakeAccount';
import ChangeInfo from './components/ChangeInfo';
import PreviousDays from './components/PreviousDays';
import SpecificDay from './components/SpecificDay';
import Navbar from './components/jsxcomponents/Navbar';
import LoggedInNav from './components/jsxcomponents/LoggedInNav';
import axios from 'axios';


function App() {
  // Making sure to check credentials every time
  axios.defaults.withCredentials = true;
  
  // Using location and history to move between pages and know where we are
  const location = useLocation();
  const history = useHistory();

  // This variable will be checked to conditionally render private and public routes
  const [ loggedin, setlog ] = useState((location.pathname==="/login" || location.pathname==="/register")? false: true);

  // Function that will be passed as a prop to child elements to set the previous variable
  function checklog(status){
    setlog(status);
  }

  // Checks if the user is logged in from the get go
  useEffect(() =>{
    let isMounted = true;
    axios.get('http://localhost:8080/user/logincheck')
            .then(res => {
                setlog(true);
            })
            .catch(err => {if (err.response){
                setlog(false);
            }})
    return () => { isMounted = false };
  }, [])

  // Logs out the user 
  function handleLogout(e){
    axios.post('http://localhost:8080/user/logout/')
        .then(res => {
            setlog(false);
            history.push("/login");
        })
        .catch(err => {if (err.response){
            setlog(false);
            history.push("/login");
        }})
  }

  // A custom route that only allows access when the user is logged in
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

    // A custom route that only allows access when the user is logged out
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

  // Conditionally render paths/navbars
  return (
    <main>
      {loggedin? <LoggedInNav handleLogout={handleLogout}/> : <Navbar />}
      <Switch>
      <Route path="/" component={Main} exact />
      <PrivateRoute handleLogout={handleLogout} changeStatus={checklog} path="/home" component={Home} />
      <PublicRoute changeStatus={checklog} path="/login" component={Login} />
      <PublicRoute changeStatus={checklog} path="/register" component={MakeAccount} />
      <PrivateRoute changeStatus={checklog} path="/updates" component={Updates} />
      <PrivateRoute changeStatus={checklog} path="/previousdays/:day/:id" component={SpecificDay} />
      <PrivateRoute changeStatus={checklog} path="/previousdays" component={PreviousDays} />
      <PrivateRoute changeStatus={checklog} path="/changeinfo" component={ChangeInfo} />
      <Route component={Error} />
      {/* maybe add a route for everything else thatll send to main */}
      </Switch>
    </main>
  );
}

export default App;
