import React, {Component} from 'react'
import Stage from '../Components/Stage'

const STAGEURL = ("http://localhost:3000/stages")

export default class StageContainer extends Component {
  state = {
    stages: []
  }

  componentDidMount() {
    fetch(STAGEURL)
    .then(r => r.json())
    .then(stageJson => this.setState({
      stages: stageJson
    }))
  }

  stageMapper = () => {
    return this.state.stages.map(stage => {
      return <Stage key={stage.id} stage={stage} />
    })
  }

  render() {
    return (
      <div>
      {this.stageMapper()}
      </div>
    )
  }

}
