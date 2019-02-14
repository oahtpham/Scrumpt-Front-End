import React from 'react'
import NewStory from '../Components/NewStory'
import NewSprint from '../Components/NewSprint'


const FormContainer = (props) => {
  console.log('form container', props)
  const sprintOrStory = () => {
    if (props.renderStory) {
      return (
      <NewStory
          sprints={props.sprints}
          onChangeStoryInput={props.onChangeStoryInput}
          submit={props.submit}
      />
      )
    }
    else if (props.renderSprint) {
      return (
        <NewSprint
        onChangeSprintInput={props.onChangeSprintInput}
        onClick={props.submit}/>
      )
    }
    else {
      return null
    }
  }

   return (
     <div>
       {sprintOrStory()}
    </div>
     )
   }

export default FormContainer
