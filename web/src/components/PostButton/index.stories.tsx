import React from 'react'
import { storiesOf } from '@storybook/react'
import PostButton from './index'

storiesOf('PostButton', module)
  .add('hello', () => <PostButton>Hello</PostButton>)
  .add('with text props', () => <PostButton text="new post" />)
  .add('new post', () => <PostButton text="+" />)
