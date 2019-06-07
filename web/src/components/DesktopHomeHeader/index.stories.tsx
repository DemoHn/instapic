import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import DesktopHomeHeader from './index'

const userInfo = {
  userName: 'diu',
  isLogin: true,
}
storiesOf('DestktopHomeHeader', module).add('default (desktop)', () => (
  <Router>
    <DesktopHomeHeader user={userInfo} hideUserBar={false} />
  </Router>
))
