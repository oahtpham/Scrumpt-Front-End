import React, {Component} from 'react'
import Sprint from '../Components/Sprint'

const SPRINTURL = ("http://localhost:3000/sprints")

export default class SprintContainer extends Component {
  state = {
    sprints: [],
  }

  componentDidMount() {
    fetch(SPRINTURL)
    .then(r => r.json())
    .then(sprintJson => this.setState({
      sprints: sprintJson
    }))
  }

  handleClick = (sprintId) => {
    const sprints = this.state.sprints.map(sprint => {
      return sprintId === sprint.id ? { ...sprint, display: !sprint.display } : sprint
    })
    this.setState({
      sprints
    })
  }

  sprintMapper = () => {
    return this.state.sprints.map(sprint => {
      return <Sprint key={sprint.id} sprint={sprint} clicked={this.handleClick}/>
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
