// HomeFooter: a mobile only footer
import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
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
        <Link to="/">
          <Icon name="home" />
        </Link>
      </span>

      <span className="middle-col col">
        <Link to="/new_post">
          <PostButton>new post</PostButton>
        </Link>
      </span>
      <span
        className="right-col col"
        onClick={() => setCurrentIndex(1)}
        data-selected={isSelected(1, currentIndex)}
      >
        <Link to="/users/@me">
          <Icon name="user outline" />
        </Link>
      </span>
    </div>
  )
}

export default HomeFooter
