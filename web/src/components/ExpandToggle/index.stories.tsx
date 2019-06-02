import React from 'react'
import { storiesOf } from '@storybook/react'
import ExpandToggle from './index'

const props = {
  textOnShrink: '更多',
  textOnExpand: '更少',
  defaultShrinkState: false,
}
storiesOf('ExpandToggle', module)
  .add('default', () => <ExpandToggle />)
  .add('with props set', () => <ExpandToggle {...props} />)
