import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import './Homepage.css';
import { Redirect, Link } from "react-router-dom"

const appScreenshot = require('./images/appscreenshot.png')

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Scrumpt'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        fontFamily: 'Rock Salt'
      }}
    />
    <Header
      as='h2'
      content='Project planning made easy.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {
    redirect: false
  }

  setRedirect = () => {
   this.setState({
     redirect: true
   })
 }

 renderRedirect = () => {
   if (this.state.redirect) {
     return <Redirect to='/app' />
   }
 }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment id="Heading"
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  <img src='https://pluralsight2.imgix.net/paths/images/scrum-a5c44d8364.png'/>
                </Menu.Item>
                <Menu.Item position='right'>
                  {this.renderRedirect()}
                  <Button as='a' inverted={!fixed} onClick={this.setRedirect}>
                    Get Started
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={5}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Inspired by Scrum Agile Methodology
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Our application aims to help visually manage and track user stories based on their various stages in the project workflow.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={8} >
            <Image bordered rounded size="massive" src={appScreenshot} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

  </ResponsiveContainer>
)
export default HomepageLayout
