import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import PostButton from '../PostButton'
import MobileNavHeader from './index'
storiesOf('MobileNavHeader', module)
  .add('default (only left)', () => (
    <Router>
      <MobileNavHeader leftLink="/" />
    </Router>
  ))
  .add('with middle component', () => (
    <Router>
      <MobileNavHeader middleComponent={<span>Hey Man's Post</span>} leftLink="/" />
    </Router>
  ))
  .add('with submit button', () => (
    <Router>
      <MobileNavHeader
        leftLink="/"
        middleComponent={<span>Hey Man's Post</span>}
        rightComponent={<PostButton text="submit" />}
      />
    </Router>
  ))
