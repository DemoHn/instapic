import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'
import './index.scss'

export interface ToggleProps {
  textOnShrink?: string
  textOnExpand?: string
  defaultShrinkState?: boolean
}

const defaults = {
  textOnShrink: 'more',
  textOnExpand: 'less',
}

const ExpandToggle: React.FC<ToggleProps> = props => {
  const { textOnExpand, textOnShrink, defaultShrinkState } = props

  const shrinkState = _.isNil(defaultShrinkState) ? true : defaultShrinkState
  const [isShrink, setIsShrink] = useState(shrinkState)

  return (
    <span className="toggle-text" onClick={() => setIsShrink(!isShrink)}>
      {isShrink ? (
        <span>
          <span className="text">{textOnShrink || defaults.textOnShrink}</span>
          <span className="icon-wrapper">
            <Icon name="chevron down" />
          </span>
        </span>
      ) : (
        <span>
          <span className="text"> {textOnExpand || defaults.textOnExpand}</span>
          <span className="icon-wrapper">
            <Icon name="chevron up" />
          </span>
        </span>
      )}
    </span>
  )
}

export default ExpandToggle
