import React from 'react'
import { storiesOf } from '@storybook/react'
import RegisterForm from './index'

storiesOf('RegisterForm', module).add('default', () => (
  <RegisterForm onLoginSubmit={() => {}} onRegisterSubmit={() => {}} />
))
