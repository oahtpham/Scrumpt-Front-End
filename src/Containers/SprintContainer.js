import React, {Component} from 'react'
import Sprint from '../Components/Sprint'
import { Card } from 'semantic-ui-react'

export default class SprintContainer extends Component {



  sprintMapper = () => {
    return this.props.sprints.map(sprint => {
      const classColor=`ui ${sprint.color} card`
      return (
        <Card.Group id="stories" key={sprint.id}>
          <Card className={classColor}>
            <Card.Content>
              <Sprint sprint={sprint} clicked={this.props.clicked} clickDetails={this.props.clickDetails} showDetails={this.props.showDetails}/>
            </Card.Content>
          </Card>
        </Card.Group>
      )
    })
  }

  formatSprint = () => {
    const classColor=`ui ${this.props.sprints.color} card`
    return (
        <Card.Group id="stories" key={this.props.sprints.id}>
          <Card className={classColor}>
            <Card.Content>
              <Sprint sprint={this.props.sprints} />
            </Card.Content>
          </Card>
        </Card.Group>
    )
  }


  render() {
    return (
        <div >
        {this.props.sprints.length > 1 ? this.sprintMapper() : this.formatSprint()}
        </div>
    )
  }

}
