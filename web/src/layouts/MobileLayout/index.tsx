import React from 'react'
import './index.scss'

export interface MobileLayoutProps {
  header: React.ReactNode
  footer: React.ReactNode
}

const MobileLayout: React.FC<MobileLayoutProps> = props => {
  return (
    <div className="frame">
      <div className="header">{props.header}</div>
      <div className="content">{props.children}</div>
      <div className="footer">{props.footer}</div>
    </div>
  )
}

export default MobileLayout
