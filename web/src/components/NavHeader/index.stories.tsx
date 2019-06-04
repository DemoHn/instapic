import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import PostButton from '../PostButton'
import NavHeader from './index'
storiesOf('NavHeader', module)
  .add('default (only left)', () => (
    <Router>
      <NavHeader leftLink="/" />
    </Router>
  ))
  .add('with middle component', () => (
    <Router>
      <NavHeader middleComponent={<span>Hey Man's Post</span>} leftLink="/" />
    </Router>
  ))
  .add('with submit button', () => (
    <Router>
      <NavHeader
        leftLink="/"
        middleComponent={<span>Hey Man's Post</span>}
        rightComponent={<PostButton text="submit" />}
      />
    </Router>
  ))
