import React from 'react'
import './index.scss'
import _ from 'lodash'

export interface MobileLayoutProps {
  header: React.ReactNode
  footer: React.ReactNode
  showFooter?: boolean
}

const MobileLayout: React.FC<MobileLayoutProps> = props => {
  const showFooter = _.isNil(props.showFooter) ? true : props.showFooter
  return (
    <div className="frame">
      <div className="header">{props.header}</div>
      <div className="content">{props.children}</div>
      {showFooter ? <div className="footer">{props.footer}</div> : null}
    </div>
  )
}

export default MobileLayout
