import React, {Component} from 'react'
import { Modal, Card, Button, Icon, Form, TextArea } from 'semantic-ui-react'

export default class NewSprint extends Component {
  render(){
    return (
      <div>
      <Form onChange={this.props.onChangeSprintInput}>
        <h2>Create a new Sprint</h2>
          <Form.Field>
          <label name="name"/>
          Name:
          <input name="sprint_name"/>
          <label name="deadline"/>
          Deadline:
          <input name="deadline" type="date" />
          <label name="color"/>
          Color:
          <input name="color"/>
          </Form.Field>
          <Button onClick={this.props.onClick} type='submit'>Submit</Button>
      </Form>
      </div>
    )
  }
}
