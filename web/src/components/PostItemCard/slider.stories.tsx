import React from 'react'
import { storiesOf } from '@storybook/react'
import Slider from './slider'

const expImage =
  'https://n.sinaimg.cn/ent/transform/150/w630h1120/20181031/fTsN-hnfikvc6114162.jpg'

const expImage2 = 'https://i.ytimg.com/vi/4nwq-xZnwJ4/hqdefault.jpg'

const expLandscapeImage =
  'https://www.pngkit.com/png/detail/34-343596_hong-kong-mtr-logo.png'
storiesOf('PostItemCard-Slider', module)
  .add('default', () => <Slider sources={[expImage]} index={0} />)
  .add('with 250px box', () => {
    const boxStyle = {
      width: '250px',
    }

    return (
      <div style={boxStyle}>
        <Slider sources={[expImage, expImage2]} index={1} />
      </div>
    )
  })

  .add('with 250px box (landscape image)', () => {
    const boxStyle = {
      width: '250px',
    }

    return (
      <div style={boxStyle}>
        <Slider sources={[expImage, expLandscapeImage, expImage2]} index={1} />
      </div>
    )
  })
