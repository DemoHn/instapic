// HomeFooter: a mobile only footer
import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import PostButton from '../PostButton'
import './index.scss'
import _ from 'lodash'

export interface HomeFooterProps {
  defaultIndex?: number
}

const isSelected = (index: number, state: number) => {
  return index === state
}

const HomeFooter: React.FC<HomeFooterProps> = props => {
  const defaultIndex = _.isNil(props.defaultIndex) ? 0 : props.defaultIndex
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  return (
    <div className="footer-frame">
      <span
        className="left-col col"
        onClick={() => setCurrentIndex(0)}
        data-selected={isSelected(0, currentIndex)}
      >
        <Icon name="home" />
      </span>
      <span className="middle-col col">
        <PostButton>new post</PostButton>
      </span>
      <span
        className="right-col col"
        onClick={() => setCurrentIndex(1)}
        data-selected={isSelected(1, currentIndex)}
      >
        <Icon name="user outline" />
      </span>
    </div>
  )
}

export default HomeFooter