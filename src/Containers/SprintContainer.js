import React, {Component} from 'react'
import Sprint from '../Components/Sprint'
import { Card } from 'semantic-ui-react'

export default class SprintContainer extends Component {


  sprintMapper = () => {
    if (!this.props.sprints) {
      return null
    }
    else if (this.props.sprints.length > 1) {
      return this.props.sprints.map(sprint => {
        const classColor=`ui ${sprint.color} card`
        return (
          <Card.Group id="stories" key={sprint.id}>
          <Card className={classColor}>
          <Card.Content>
          <Sprint
          sprint={sprint}
          clicked={this.props.clicked}
          clickDetails={this.props.clickDetails}
          showDetails={this.props.showDetails}
          deleteSprint={this.props.deleteSprint}
          handleSprintChange={this.props.onChangeSprintInput}
          editSprint={this.props.editSprint}
          />
          </Card.Content>
          </Card>
          </Card.Group>
        )
      })
    }
    else {
      const classColor=`ui ${this.props.sprints.color} card`
      return (
        <Card.Group id="stories" key={this.props.sprints.id}>
        <Card className={classColor}>
        <Card.Content>
        <Sprint
        sprint={this.props.sprints}
        deleteSprint={this.props.deleteSprint}
        editSprint={this.props.editSprint}
        handleSprintChange={this.props.handleSprintChange}
        />
        </Card.Content>
        </Card>
        </Card.Group>
      )
    }
  }

  render() {
    return (
        <div >
        {this.sprintMapper()}
        </div>
    )
  }

}
