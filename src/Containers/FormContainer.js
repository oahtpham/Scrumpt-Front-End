import React from 'react'
import NewStory from '../Components/NewStory'
import NewSprint from '../Components/NewSprint'


const FormContainer = (props) => {
   return (
     <div>
       {props.renderSprint ?
         <NewSprint
         onChangeSprintInput={props.onChangeSprintInput}
         onClick={props.submit}
         render={props.renderSprint}/>
         :
         <NewStory
         sprints={props.sprints}
         onChangeStoryInput={props.onChangeStoryInput}
         submit={props.submit}
         render={props.renderSprint}
         />
       }
     </div>
  )
}

export default FormContainer
