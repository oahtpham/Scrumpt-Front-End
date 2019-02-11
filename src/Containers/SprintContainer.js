import React, {Component} from 'react'
import Sprint from '../Components/Sprint'

export default class SprintContainer extends Component {


  sprintMapper = () => {
    return this.props.sprints.map(sprint => {
      return <Sprint key={sprint.id} sprint={sprint} clicked={this.props.clicked}/>
    })
  }


  render() {
    return (
        <div className = "four wide column">
        {this.sprintMapper()}
        </div>
    )
  }

}
