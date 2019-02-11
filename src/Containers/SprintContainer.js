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


  render() {
    return (
        <div >
        {this.sprintMapper()}
        </div>
    )
  }

}
