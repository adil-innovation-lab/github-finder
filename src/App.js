import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  // This function is called from the Search component by passing props up
  searchUsers = async (text) => {
    this.setState( { loading: true } );
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.EACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState( { users: res.data.items, loading: false } )
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
    const { users, loading } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );  
  }
}

export default App;
