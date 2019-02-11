import React, {Component} from 'react'
import App from './App';
import { Redirect } from "react-router-dom"

class Login extends Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
   this.setState({
     redirect: true
   })
 }
 renderRedirect = () => {
   if (this.state.redirect) {
     return <Redirect to='/app' />
   }
 }
  render() {
    return (
      <form>
      <label>Username</label>
      <input name="Username"/>
      <label>Password</label>
      <input name="Password"/>
      {this.renderRedirect()}
      <button onClick={this.setRedirect}>Log In</button>
      </form>
    )
  }
}

export default Login
