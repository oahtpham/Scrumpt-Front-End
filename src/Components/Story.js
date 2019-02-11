import React from 'react'

const Story = ({story}) => {
  return (
    <div>
    <b>{story.title}</b>
    <p>{story.description}</p>
    </div>
  )
}

export default Story
