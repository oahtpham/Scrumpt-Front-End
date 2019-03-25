import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Stage from './Stage'
import App from '../App'
import { Grid, Modal, Button } from 'semantic-ui-react'
import NewStory from './NewStory'
import FormContainer from '../Containers/FormContainer'

const Nav = (props) => {
  return (
    <div className="ui teal inverted segment">
      <div>
        <div className="ui inverted secondary menu">
        <Link to="/" className="item">Home</Link>
        <a className="item" onClick={props.showStory}>Add New Story</a>
        <Modal open={props.renderStory}>
          <Button
            className= 'ui right floated button'
            onClick={props.showStory}>X</Button>
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
        </div>
    </div>
  )
}

export default Nav


// <Route path="/dashboard" component={App}/>
// <Route path="/settings" component={App}/>
