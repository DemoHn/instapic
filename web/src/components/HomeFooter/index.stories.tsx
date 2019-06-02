import React from 'react'
import { storiesOf } from '@storybook/react'
import HomeFooter from './index'

storiesOf('HomeFooter', module)
  .add('default', () => <HomeFooter />)
  .add('select index 1', () => <HomeFooter defaultIndex={1} />)
