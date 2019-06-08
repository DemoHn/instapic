import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'
import UserDropdown from './index'

storiesOf('UserDropdown', module)
  .add('with userName', () => (
    <Router>
      <UserDropdown isLogin={true} userName={'Elton Lau'} />
    </Router>
  ))
  .add('not login', () => (
    <Router>
      <UserDropdown isLogin={false} />
    </Router>
  ))
