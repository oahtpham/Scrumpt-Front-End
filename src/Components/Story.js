import React from 'react'
import { Modal, Card, Button, Icon } from 'semantic-ui-react'

export default class Story extends React.Component {

  state = {
    showDetails: false
  }

  handleStoryClick = (storyId) => {
    this.setState(prevState => {
      return { showDetails: !prevState.showDetails }
    })
  }

  render() {
    return (
    <div
      onClick={() => this.handleStoryClick(this.props.story.id)}>
      <b>{this.props.story.title}</b>
      <Modal open={this.state.showDetails}>
        <Modal.Header>{this.props.story.title}</Modal.Header>
        <Modal.Content>
          {this.props.story.description}
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Update
          </Button>
          <Button onClick={() => this.props.deleteStory(this.props.story)} color='red' inverted>
            <Icon name='remove' /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
      </div>
    )
  }

}
