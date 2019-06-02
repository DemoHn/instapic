import React from 'react'
import { storiesOf } from '@storybook/react'
import UserDropdown from './index'

storiesOf('UserDropdown', module)
  .add('with userName', () => <UserDropdown isLogin={true} userName={'Elton Lau'} />)
  .add('not login', () => <UserDropdown isLogin={false} />)
