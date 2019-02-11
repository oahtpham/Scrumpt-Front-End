import React from 'react'
import Story from './Story'
import { Button, Card, Image } from 'semantic-ui-react'


const Stage = (props) => {

  const storyMapper = () => {
    if (props.stories !== null) {
      console.log(props.stories)
      const filteredStories = props.stories.filter(story => story.stage_id === props.stage.id)
      return filteredStories.map(story => {
        return (
          <Card.Group id="stories" key={story.id}>
            <Card>
              <Card.Content>
                <Story  story={story}/>
              </Card.Content>
            </Card>
          </Card.Group>
        )
      })
    }
  }

  return (
        <div>
          <h3>{props.stage.stage_name}</h3>
            {storyMapper()}
        </div>
  )
}

export default Stage
