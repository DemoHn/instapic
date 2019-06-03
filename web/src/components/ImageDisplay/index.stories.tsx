import React from 'react'
import { storiesOf } from '@storybook/react'
import ImageDisplay from './index'

const expImage =
  'https://n.sinaimg.cn/ent/transform/150/w630h1120/20181031/fTsN-hnfikvc6114162.jpg'

const expLandscapeImage =
  'https://www.pngkit.com/png/detail/34-343596_hong-kong-mtr-logo.png'
storiesOf('ImageDisplay', module)
  .add('default', () => <ImageDisplay source={expImage} />)
  .add('with 250px box', () => {
    const boxStyle = {
      width: '250px',
    }

    return (
      <div style={boxStyle}>
        <ImageDisplay source={expImage} />
      </div>
    )
  })

  .add('with 250px box (landscape image)', () => {
    const boxStyle = {
      width: '250px',
    }

    return (
      <div style={boxStyle}>
        <ImageDisplay source={expLandscapeImage} />
      </div>
    )
  })
