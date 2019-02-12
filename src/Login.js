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
      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <h2 class="ui teal image header">
            <div class="content">
              Log in to your account
            </div>
          </h2>
          <form class="ui large form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input name="username"/>
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input name="Password"/>
                </div>
              </div>
              {this.renderRedirect()}
              <button class="ui fluid large teal submit button" onClick={this.setRedirect}>Log in</button>
            </div>
            <div class="ui error message"></div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
