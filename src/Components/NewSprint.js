import React, {Component} from 'react'

export default class NewSprint extends Component {
  render(){
    return (
      <div>
      <h2>Create a new Sprint</h2>
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
          <button type="submit" onClick={this.props.onClick}> Submit </button>
          <br/>
          <br/>
        </form>
      </div>
    )
  }
}
