import React from 'react'
import { Modal, Card, Button, Icon, Form } from 'semantic-ui-react'

export default class Story extends React.Component {

  state = {
    showDetails: false,
    edit: false
  }

  handleStoryClick = (storyId) => {
    this.setState(prevState => {
      return { showDetails: !prevState.showDetails }
    })
  }


  toggleEdit = () => {
    this.setState(prevState => {
      return {edit: !prevState.edit}
    })
  }

  toggleShowDetails = () => {
    this.setState(prevState => {
      return {showDetails: !prevState.showDetails}
    })
  }

  toggleEditandDetails = (event, story) => {
    this.toggleEdit()
    this.toggleShowDetails()
    this.props.editStory(event, story)
  }

  render() {
    return (
    <div onDoubleClick={() => this.handleStoryClick(this.props.story.id)}>
      <b>{this.props.story.title}</b>
      <Modal open={this.state.showDetails}>
      <Button onClick = {this.toggleShowDetails} className= 'ui right floated button'>X</Button>
        <Modal.Header>{this.props.story.title}</Modal.Header>
        <Modal.Content>
          {this.props.story.description}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.toggleEdit} color='green' inverted>
            <Icon name='checkmark' /> Update
          </Button>
          <Button onClick={() => this.props.deleteStory(this.props.story)} color='red' inverted>
            <Icon name='remove' /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal open={this.state.edit}>
       <Button onClick = {this.toggleEdit} className= 'ui right floated button'>X</Button>
      <Modal.Content>
      <Form onChange={this.props.onChange} onSubmit={(event) => this.toggleEditandDetails(event, this.props.story)}>
        <h2>Edit Story</h2>
          <Form.Field>
            <label>Title</label>
              <input name='title' defaultValue={this.props.story.title} />
            <label>Description</label>
              <input name='description'defaultValue={this.props.story.description}/>
            <label>Sprint</label>
            <select name="sprint" id="sprint-input">
            {this.props.sprints.map(sprint => {
              return (
                <option key={sprint.id} name={sprint.sprint_name}>{sprint.sprint_name}</option>
              )
            })}
            <option>null</option>
            </select>
          </Form.Field>
          <Button type='submit'>Submit</Button>
     </Form>
      </Modal.Content>
      </Modal>
      </div>
    )
  }

}
