import React from 'react'
import { storiesOf } from '@storybook/react'
import PostItemCard from './index'
import { BrowserRouter as Router } from 'react-router-dom'

const expImage =
  'https://n.sinaimg.cn/ent/transform/150/w630h1120/20181031/fTsN-hnfikvc6114162.jpg'

const expImage2 = 'https://i.ytimg.com/vi/4nwq-xZnwJ4/hqdefault.jpg'

const expLandscapeImage =
  'https://www.pngkit.com/png/detail/34-343596_hong-kong-mtr-logo.png'

const descStyle = {
  width: '360px',
  border: '1px solid blue',
  marginTop: '10px',
  marginLeft: '10px',
  padding: '10px',
}

storiesOf('PostItemCard-index', module)
  .add('single image', () => {
    const props = {
      user: {
        name: 'Elton Lau',
        link: 'elton',
      },
      description: 'Hello world',
      images: [expImage],
      postTimestamp: Date.now() - 24 * 60 * 1000,
    }

    return (
      <Router>
        <div style={descStyle}>
          <PostItemCard {...props} />
        </div>
      </Router>
    )
  })

  .add('multiple images', () => {
    const props = {
      user: {
        name: 'Alexander Wong Ibrahim',
        link: 'elton',
      },
      description: 'This is a super-super-super-super-supersupersupersuper',
      images: [expImage, expImage2, expImage, expImage2, expImage],
      postTimestamp: Date.now() - 240 * 60 * 1000,
    }

    return (
      <Router>
        <div style={descStyle}>
          <PostItemCard {...props} />
        </div>
      </Router>
    )
  })
