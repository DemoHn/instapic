import React from 'react'
import { storiesOf } from '@storybook/react'
import RefreshContainer from './index'
import DefaultPulldown from './pulldown'
import DefaultRelease from './realease'
import DefaultRefresh from './refresh'

const onRefresh = () => {
  // emulate API loading
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2500)
  })
}
storiesOf('RefreshContainer', module)
  .add('default pulldown', () => <DefaultPulldown />)
  .add('default release', () => <DefaultRelease />)
  .add('default refresh', () => <DefaultRefresh />)
  .add('load refresh container', () => {
    return (
      <RefreshContainer
        onRefresh={onRefresh}
        pullDownThreshold={70}
        backgroundColor="white"
      >
        {Array(100)
          .fill(12)
          .map(item => (
            <div>{'diu ' + item}</div>
          ))}
      </RefreshContainer>
    )
  })
