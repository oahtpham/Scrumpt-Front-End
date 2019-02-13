import React from 'react'
import Story from './Story'
import { Button, Card, Image } from 'semantic-ui-react'


const Stage = (props) => {

  const storyMapper = () => {
    if (props.stories !== null && props.stories.length >= 1) {
      const filteredStories = props.stories.filter(story => story.stage_id === props.stage.id)
      return filteredStories.map(story => {
        const classColor=`ui ${story.color} card`
        return (
          <Card.Group id="stories" key={story.id}>
            <Card className ={classColor}>
              <Card.Content>
                <Story
                story={story}
                deleteStory={props.deleteStory}
                onChange={props.onChange}
                sprints={props.sprints}
                editStory={props.editStory}
                />
              </Card.Content>
            </Card>
          </Card.Group>
        )
      })
    }
    else {
      return null
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
