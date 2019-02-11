import React from 'react'
import Story from './Story'

const Stage = (props) => {

  const storyMapper = () => {
    if (props.stories !== null) {
      const filteredStories = props.stories.filter(story => story.stage_id === props.stage.id)
      return filteredStories.map(story => {
        return <Story key={story.id} story={story}/>
      })
    }
  }

  console.log(storyMapper())

  return (
    <div>
    <h1>{props.stage.stage_name}</h1>
    <p>{storyMapper()}</p>
    </div>
  )
}

export default Stage
