import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // This function is called from the Search component by passing props up
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.EACT_APP_GITHUB_CLIENT_SECRET}`)
    setUsers(res.data.items);
    setLoading(false);
  }

  // This function is called from the User Item Component to display User Details from GitHub
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.EACT_APP_GITHUB_CLIENT_SECRET}`)
    setUser(res.data);
    setLoading(false);
  }

  // This function is called from the User.js component to display the latest repos from GitHub
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.EACT_APP_GITHUB_CLIENT_SECRET}`)
    setRepos(res.data);
    setLoading(false);
  }

  // This function is called from the Search component to clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  // This function is called from the Search component to raise an alert for empty text field search
  const displayAlert = (msg, type) => {
    setAlert({ msg, type });
    // Remove the Alert message after 5 seconds
    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              {/* Route for the home page */}
              <Route exact path='/' render={ props => (
                <Fragment>
                  <Search searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true : false}
                  setAlert={displayAlert}
                  />
                  <Users loading={loading} users={users} />   
                </Fragment>     
              )} />
              {/* Route for the about page */}
              <Route exact path='/about' component={About} />
              {/* Route for User Details pages */}
              <Route exact path='/user/:login' render={ props => (
                <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );  
}

export default App;
