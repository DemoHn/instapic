import React from 'react'
import { storiesOf } from '@storybook/react'

import DesktopLayout from './index'

const DHeader: React.FC = () => {
  return <p>This is Header</p>
}

const DContent: React.FC<{ index?: number }> = props => {
  return <p>This is content {props.index || ''}</p>
}

storiesOf('Layout/DesktopLayout', module)
  .add('default', () => (
    <DesktopLayout header={<DHeader />}>{<DContent />}</DesktopLayout>
  ))
  .add('default with scroll', () => {
    const contentArr = []
    for (var i = 0; i < 200; i++) {
      contentArr.push(<DContent index={i} />)
    }
    return <DesktopLayout header={<DHeader />}>{contentArr}</DesktopLayout>
  })
