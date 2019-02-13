import React from 'react'
import { Modal, Card, Button, Icon, Form, TextArea } from 'semantic-ui-react'
import StageContainer from '../Containers/StageContainer'




const _MS_PER_DAY = 1000 * 60 * 60 * 24
const todaysDate = new Date()


export default class Sprint extends React.Component {


  state = {
    showDetails: false,
    stories: this.props.sprint.stories,
    edit: false
  }

  handleSprintDoubleClick = (sprintId) => {
    this.setState(prevState => {
      return { showDetails: !prevState.showDetails }
    }, () => console.log(this.state.showDetails))
  }

  dateFormat = new Date(this.props.sprint.deadline)

  dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  editToggle = () => {
    this.setState(prevState => {
      return {edit: !prevState.edit}
    }
    )
  }

  toggleShowDetails = () => {
    this.setState(prevState => {
    return {showDetails: !prevState.showDetails}
    })
  }

  toggleEditandDetails = () => {
    this.setState(prevState => {
    return {
      showDetails: false,
      edit: false
    }
    })
  }

  editSprintandToggle = (event, sprint) => {
    this.props.editSprint(event, sprint)
    this.toggleEditandDetails()
  }



  render(){
    return (
    <div onClick={() => this.props.clicked(this.props.sprint.id)} onDoubleClick={this.handleSprintDoubleClick}>
      <h5>{this.props.sprint.sprint_name}</h5>
      <p>Days Left: {this.dateDiffInDays(todaysDate, this.dateFormat)}</p>
      <Modal open={this.state.showDetails}>
        <Modal.Header>{this.props.sprint.sprint_name} <Button onClick = {this.toggleShowDetails} className= 'ui right floated button'>X</Button>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
            {this.props.sprint.description}
            </Modal.Description>
            Deadline: {this.dateDiffInDays(todaysDate, this.dateFormat)} days
          </Modal.Content>
          <Modal.Actions>
          <Button onClick={this.editToggle} color='green' inverted>
            <Icon name='edit' /> Edit Sprint
          </Button>
            <Button onClick={() => this.props.deleteSprint(this.props.sprint.id)} color='red' inverted>
              <Icon name='remove' /> Delete
            </Button>
          </Modal.Actions>
      </Modal>
      <Modal open={this.state.edit}>
       <Button onClick = {this.toggleEditandDetails} className= 'ui right floated button'>X</Button>
      <Modal.Content>
      <Form onChange={this.props.handleSprintChange}>
        <h2>Edit Sprint</h2>
          <Form.Field>
            <label>Title</label>
              <input name='sprint_name' placeholder={this.props.sprint.sprint_name} />
            <label>Description</label>
              <input name='description'placeholder={this.props.sprint.description}/>
            <label>Deadline</label>
              <input name="deadline" type="date" placeholder={this.props.sprint.deadline}/>
            <label>Color</label>
              <input name="color" placeholder={this.props.sprint.color}/>
          </Form.Field>
          <Button onClick={(event) => this.editSprintandToggle(event, this.props.sprint)}type='submit'>Submit</Button>
     </Form>
      </Modal.Content>
      </Modal>
    </div>
    )
  }


}
