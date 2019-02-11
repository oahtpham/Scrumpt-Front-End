import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Stage from './Stage'
import App from '../App'


const Nav = (props) => {

  return (
    <div className="ui teal inverted segment">
      <Router>
      <div>
        <div className="ui inverted secondary menu">
          <Link to="/" className="active item">Home</Link>
          <Link to="/dashboard" className="item" >Sprint Dashboard</Link>
          <Link to="/settings" className="item">Settings</Link>
        </div>
        </div>
      </Router>
    </div>
  )
}

export default Nav

// <Route exact path="/home"
// component={App}/>
// <Route path="/dashboard" component={App}/>
// <Route path="/settings" component={App}/>
