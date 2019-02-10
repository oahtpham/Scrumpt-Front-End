import React from 'react'
import Story from './Story'
import UUID from 'uuid'

const Stage = (props) => {

  const storyMapper = () => {
    return props.stories.map(story => {
      return <Story key={UUID()} story={story}/>
    })
  }

  return (
    <div>
    <h1>{props.stage.stage_name}</h1>
    <p>{storyMapper()}</p>
    </div>
  )
}

export default Stage
