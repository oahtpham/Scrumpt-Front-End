import React from 'react'
import NewStory from '../Components/NewStory'
import NewSprint from '../Components/NewSprint'


const FormContainer = (props) => {
   return (
     <div>
       {props.renderSprint ?
         <NewSprint
         onChangeSprintInput={props.onChangeSprintInput}
         onClick={props.submit}/>
         :
         <NewStory
         sprints={props.sprints}
         onChangeStoryInput={props.onChangeStoryInput}
         submit={props.submit}
         />
       }
     </div>
  )
}

export default FormContainer


// <form onChange={this.props.onChangeSprintInput}>
// <label name="name"/>
// Name:
// <input name="sprint_name"/>
// <label name="deadline"/>
// <br/> Deadline:
// <input name="deadline" type="date" />
// <label name="color"/>
// <br/>Color:
// <input name="color"/>
// <br/>
// <button type="submit" onClick={this.props.submit}> Submit </button>
// <br/>
// <br/>
// { this.state.showing ? <NewStory storyInputs={this.handleStoryInputs}/> : null }
// <button type="submit" onClick={this.handleNewStoryClick}> Add new Story </button>
// </form>
