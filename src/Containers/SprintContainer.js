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

  sprintMapper = () => {
    return this.state.sprints.map(sprint => {
      return <Sprint key={sprint.id} sprint={sprint} />
    })
  }

  render() {
    return (
      <div>
      {this.sprintMapper()}
      </div>
    )
  }

}
