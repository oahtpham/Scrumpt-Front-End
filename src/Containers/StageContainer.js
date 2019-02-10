import React, {Component} from 'react'
import Stage from '../Components/Stage'
import { Grid, Header } from 'semantic-ui-react'

const STAGEURL = ("http://localhost:3000/stages")
const STORYURL = ("http://localhost:3000/stories")

export default class StageContainer extends Component {
  state = {
    stages: [],
    stories: []
  }

  componentDidMount() {
    fetch(STAGEURL)
    .then(r => r.json())
    .then(stageJson => this.setState({
      stages: stageJson
    }))
    fetch(STORYURL)
    .then(r => r.json())
    .then(storyJson => this.setState({
      stories: storyJson
    }))
  }

  stageMapper = () => {
    return this.state.stages.map(stage => {
      return (
        <Stage key={stage.id} stage={stage} stories={this.state.stories.filter(story => story.stage_id === stage.id)}/>
      )
    })
  }


  render() {
    return (
      <div>
        <div >
        {this.stageMapper()}
        </div>
      </div>
    )
  }

}
