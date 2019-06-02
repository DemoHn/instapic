import React from 'react'
import { storiesOf } from '@storybook/react'
import HomeHeader from './index'

const userInfo = {
  userName: 'diu',
  isLogin: true,
}
storiesOf('HomeHeader', module)
  .add('default (mobile)', () => <HomeHeader isMobile={true} userInfo={userInfo} />)
  .add('default (desktop)', () => <HomeHeader isMobile={false} userInfo={userInfo} />)
