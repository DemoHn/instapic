import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Test from './index'

storiesOf('Test', module)
  .add('with text', () => (
    <div>
      <Test num={2} text={'diu'} />
      <button onClick={action('hello-click')}>AAA</button>
    </div>
  ))
  .add('with test and positive number', () => <Test num={23} text={'diu'} />)
