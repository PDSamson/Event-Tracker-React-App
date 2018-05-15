import React, { Component } from 'react';
import './App.css';
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import EventList from './components/EventList'
import store from './store'
import { signUpFunction, signInFunction, signOutFunction } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedOut: true, feedback: '' };
  }
  signUp = (newEmail, newPassword, newPasswordConfirmation) => {
    const credentials = {credentials:{
        email:newEmail,
        password:newPassword,
        password_confirmation:newPasswordConfirmation
      }
    }
    signUpFunction(credentials)
      .then((response) => {
        this.setState({ feedback: 'Sign-Up Success'})
        })
      .catch((response) => {
        this.setState({ feedback: 'Sign-Up Failure'})
        })
  }
  signIn = (userEmail, userPassword) => {
    const credentials = {credentials:{
      email:userEmail,
      password:userPassword
      }
    }
    signInFunction(credentials)
      .then((response) => {
        store.user = response.user
        this.setState({ feedback: 'Sign-In Success'})
        this.setState({ loggedOut: false})
        })
      .catch(() => {
        this.setState({ feedback: 'Sign-In Failure'})
        })
  }
  signOut = () => {
    signOutFunction()
      .then(() => {
        this.setState({ feedback: 'Sign-Out Success'})
        this.setState({ loggedOut: true})
      })
      .catch(() => {
        this.setState({ feedback: 'Sign-Out Failure'})
      })
  }
  render() {
    const { loggedOut } = this.state;
    return (
      <div className="App">
        <h1 className="title">Schedule Tracker</h1>
        <div className="response-field">{this.state.feedback}</div>
        { loggedOut
          ? <div className="sign-in-page">
              <SignUpForm signUpAction={this.signUp}/>
              <SignInForm signInAction={this.signIn}/>
            </div>
          : <div className="content-page">
              <button className="user-access" onClick={this.signOut}>
                Sign Out
              </button>
              <EventList />
            </div>
          }
      </div>
    );
  }
}

export default App;
