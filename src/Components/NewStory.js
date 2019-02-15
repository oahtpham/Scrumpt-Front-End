import React, {Component} from 'react'
import { Modal, Card, Button, Icon, Form, TextArea } from 'semantic-ui-react'

const NewStory = (props) => {
console.log("inside nav", props)
const sprintMapper = () => {
  console.log("sprintmapper")
  if (!props.sprints) { return [null] }

  return props.sprints.map(sprint => {
    return (
      <option key={sprint.id} name={sprint.sprint_name}>{sprint.sprint_name}</option>
    )
  })
}
  return (
    <div>
    <Form onChange={props.onChangeStoryInput} onSubmit={props.submit}>
      <h2>Create a new Story</h2>
        <Form.Field>
          <label>Title</label>
            <input name="title"/>
          <label>Description</label>
            <input name="description"/>
            <label name="stage"/>
            Stage:
            <select name="stage" id="stage-input">
              <option value="1">Icebox</option>
              <option value="2">Emergency</option>
            </select>
            Sprint:
            <select name="sprint" id="sprint-input">
            {sprintMapper()}
            <option>null</option>
            </select>
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>
    </div>
  )
}


export default NewStory
