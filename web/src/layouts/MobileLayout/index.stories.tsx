import React from 'react'
import { storiesOf } from '@storybook/react'

import MobileLayout from './index'

const DHeader: React.FC = () => {
  return <p>This is Header</p>
}

const DContent: React.FC<{ index?: number }> = props => {
  return <p>This is content {props.index || ''}</p>
}

const DFooter: React.FC = () => {
  return <p>This is Footer</p>
}

storiesOf('Layout/MobileLayout', module)
  .add('default', () => (
    <MobileLayout header={<DHeader />} footer={<DFooter />}>
      {<DContent />}
    </MobileLayout>
  ))
  .add('hide footer', () => (
    <MobileLayout header={<DHeader />} footer={<DFooter />} showFooter={false}>
      {<DContent />}
    </MobileLayout>
  ))
  .add('default with scroll', () => {
    const contentArr = []
    for (var i = 0; i < 200; i++) {
      contentArr.push(<DContent index={i} />)
    }
    return (
      <MobileLayout header={<DHeader />} footer={<DFooter />}>
        {contentArr}
      </MobileLayout>
    )
  })
