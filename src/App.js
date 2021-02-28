import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // This function is called from the Search component by passing props up
  searchUsers = async (text) => {
    this.setState( { loading: true } );
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.EACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState( { users: res.data.items, loading: false } )
  }

  // This function is called from the User Item Component to display User Details from GitHub
  getUser = async (username) => {
    this.setState( { loading: true } );
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.EACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState( { user: res.data, loading: false } )
  }

  // This function is called from the Search component to clear users from state
  clearUsers = () => this.setState({ users: [], loading: false })

  // This function is called from the Search component to raise an alert for empty text field search
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    // Remove the Alert message after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              {/* Route for the home page */}
              <Route exact path='/' render={ props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />   
                </Fragment>     
              )} />
              {/* Route for the about page */}
              <Route exact path='/about' component={About} />
              {/* Route for User Details pages */}
              <Route exact path='/user/:login' render={ props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );  
  }
}

export default App;
