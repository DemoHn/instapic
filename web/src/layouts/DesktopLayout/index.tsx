import React, { ReactNode } from 'react'

export interface DesktopLayoutProps {
  header: ReactNode
}
const DesktopLayout: React.FC<DesktopLayoutProps> = props => {
  return (
    <div className="frame">
      <div className="header">{props.header}</div>
      <div className="content">{props.children}</div>
    </div>
  )
}

export default DesktopLayout
