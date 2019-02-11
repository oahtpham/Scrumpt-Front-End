import React from 'react'
import NewStory from '../Components/NewStory'

const STORYURL = ("http://localhost:3000/stories")

export default class FormContainer extends React.Component {

  state = {
    showing: false,
    title: "",
    description: "",
    stage: "",
    sprint_id: null,
  }

  handleNewStoryClick = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return {showing: !prevState.showing}
    })
  }

  handleStoryInputs = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state.title, this.state.description, this.state.stage))
  }

  // createNewStory = () => {
  //   fetch(STORYURL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       title: this.state.title,
  //       description: this.state.description,
  //       stage: parseInt(this.state.stage),
  //       sprint_id: ""
  //     })
  //   })
  //   .then(r => r.json())
  //   .then(mySprint => {
  //     this.setState(prevState => {
  //       return {sprints: [...prevState.sprints, mySprint]}
  //     })
  //   })
  // }


  render(){
   return (
      <form onChange={this.props.onChangeSprintInput}>
        <label name="name"/>
        Name:
        <input name="sprint_name"/>
        <label name="deadline"/>
        <br/> Deadline:
        <input name="deadline" type="date" />
        <label name="color"/>
        <br/>Color:
        <input name="color"/>
        <br/>
        <button type="submit" onClick={this.props.submit}> Submit </button>
        <br/>
        <br/>
        { this.state.showing ? <NewStory storyInputs={this.handleStoryInputs}/> : null }
        <button type="submit" onClick={this.handleNewStoryClick}> Add new Story </button>
      </form>
  )}

}
