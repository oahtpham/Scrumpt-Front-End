import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Stage from './Stage'
import App from '../App'
import { Grid, Modal } from 'semantic-ui-react'
import NewStory from './NewStory'
import FormContainer from '../Containers/FormContainer'



const Nav = (props) => {
  console.log("inside nav", props)
  return (
    <div className="ui teal inverted segment">
      <div>
      <Router>
        <div className="ui inverted secondary menu">
        <Link to="/" className="item">Home</Link>
        <Link to="/dashboard" className="item" >Sprint Dashboard</Link>
        <Link to="/Backlog" className="item">Backlog</Link>
        <a className="item" onClick={props.showStory}>Add New Story</a>
        <Modal open={props.renderStory}>
          <Modal.Content>
          <FormContainer
          sprints={props.sprints}
          onChangeStoryInput={props.onChangeStoryInput}
          submit={props.submit}
          renderStory={props.renderStory}
          renderSprint={props.renderSprint}/>
          </Modal.Content>
        </Modal >
        </div>
      </Router>
        </div>
    </div>
  )
}

export default Nav


// <Route path="/dashboard" component={App}/>
// <Route path="/settings" component={App}/>
