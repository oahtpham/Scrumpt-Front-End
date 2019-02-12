import React, {Component} from 'react'

const NewStory = (props) => {

  return (
    <div>
    <h2>Create a new Story</h2>
    <form onChange={props.onChangeStoryInput} onSubmit={props.submit}>
      <label name="name"/>
      Title:
      <input name="title"/>
      <label name="description"/>
      Description:
      <input name="description"/>
      <label name="stage"/>
      Stage:
      <select name="stage" id="stage-input">
        <option value="1">Icebox</option>
        <option value="2">Emergency</option>
      </select>
      Sprint:
      <select name="sprint" id="sprint-input">
      {props.sprints.map(sprint => {
        return (
          <option name={sprint.sprint_name}>{sprint.sprint_name}</option>
        )
      })}
      <option>null</option>
      </select>
      <button type="submit"> Submit </button>
    </form>
    </div>
  )
}

export default NewStory
