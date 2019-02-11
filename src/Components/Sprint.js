import React from 'react'

const Sprint = (props) => {
  return (
    <div>
      <p onClick={() => props.clicked(props.sprint.id)}>{props.sprint.sprint_name}</p>
    </div>
  )
}

export default Sprint
