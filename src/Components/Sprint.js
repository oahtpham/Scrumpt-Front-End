import React from 'react'

const Sprint = (props) => {

  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  const todaysDate = new Date()
  const dateFormat = new Date(props.sprint.deadline)

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }


  return (
    <div onClick={() => props.clicked(props.sprint.id)}>
      <h5>{props.sprint.sprint_name}</h5>
      <p>Days Left: {dateDiffInDays(todaysDate, dateFormat)}</p>
    </div>
  )
}

export default Sprint
