import React from 'react'
import { Modal } from 'semantic-ui-react'
import Story from './Story'
import {Card} from 'semantic-ui-react'
import StageContainer from '../Containers/StageContainer'

const _MS_PER_DAY = 1000 * 60 * 60 * 24
const todaysDate = new Date()


export default class Sprint extends React.Component {

  state = {
    showDetails: false,
    stories: this.props.sprint.stories
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


  storyMapper = () => {
    return this.state.showDetails ? <StageContainer sprints={this.props.sprint}/>
    :
    null
  }


  render(){
    return (
    <div onClick={() => this.props.clicked(this.props.sprint.id)} onDoubleClick={this.handleSprintDoubleClick}>
      <h5>{this.props.sprint.sprint_name}</h5>
      <p>Days Left: {this.dateDiffInDays(todaysDate, this.dateFormat)}</p>
      <Modal open={this.state.showDetails}>
        <Modal.Header>{this.props.sprint.sprint_name}</Modal.Header>
          <Modal.Content>
            {this.storyMapper()}
            Days Left: {this.dateDiffInDays(todaysDate, this.dateFormat)}
          </Modal.Content>
      </Modal>
    </div>
    )
  }


}
