import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Description from './description'

const descStyle = {
  height: '300px',
  width: '200px',
  border: '1px solid blue',
  marginTop: '10px',
  marginLeft: '10px',
}
storiesOf('Description', module).add('default', () => (
  <Router>
    <div style={descStyle}>
      <Description
        userLink="/"
        userName="Elton Lau"
        postTimestamp={Date.now() - 24 * 60 * 1000}
      >
        Hello, World!
      </Description>
    </div>
  </Router>
))
