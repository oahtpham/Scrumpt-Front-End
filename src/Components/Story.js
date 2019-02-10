import React from 'react'

const Story = ({story}) => {
  return (
    <div>
    <h3>{story.title}</h3>
    <p>{story.description}</p>
    </div>
  )
}

export default Story
