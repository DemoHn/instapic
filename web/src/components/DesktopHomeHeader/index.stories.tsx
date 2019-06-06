import React from 'react'
import { storiesOf } from '@storybook/react'
import DesktopHomeHeader from './index'

const userInfo = {
  userName: 'diu',
  isLogin: true,
}
storiesOf('DestktopHomeHeader', module).add('default (desktop)', () => (
  <DesktopHomeHeader user={userInfo} hideUserBar={false} />
))
