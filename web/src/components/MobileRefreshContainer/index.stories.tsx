import React from 'react'
import { storiesOf } from '@storybook/react'
import MobileRefreshContainer from './index'
import DefaultPulldown from './pulldown'
import DefaultRelease from './realease'
import DefaultRefresh from './refresh'

const onRefresh = () => {
  // emulate API loading
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(false)
    }, 1000)
  })
}
storiesOf('MobileRefreshContainer', module)
  .add('default pulldown', () => <DefaultPulldown />)
  .add('default release', () => <DefaultRelease />)
  .add('default refresh', () => <DefaultRefresh />)
  .add('load refresh container', () => {
    return (
      <div style={{ marginTop: '30px', position: 'relative' }}>
        <MobileRefreshContainer
          onTopRefresh={onRefresh}
          onBottomRefresh={onRefresh}
          triggerHeight={50}
          bottomRefreshThreshold={70}
          pullDownThreshold={70}
          backgroundColor="white"
        >
          {Array(100)
            .fill(12)
            .map(item => (
              <div>{'diu ' + item}</div>
            ))}
        </MobileRefreshContainer>
      </div>
    )
  })
