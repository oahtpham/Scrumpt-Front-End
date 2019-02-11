import React, {Component} from 'react'

const StoryForm = (props) => {

  return (
    <form onChange={props.storyInputs}>
      <label name="name"/>
      Title:
      <input name="title"/>
      <label name="description"/>
      Description:
      <input name="description"/>
      <label name="stage"/>
      Stage:
      <select name="stage" >
        <option value="1">Icebox</option>
        <option value="2">Emergency</option>
      </select>
      <button type="submit" onClick={null}> Submit </button>
    </form>
  )
}

export default StoryForm
