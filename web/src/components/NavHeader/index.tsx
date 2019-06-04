import React, { ReactNode } from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './index.scss'

export interface NavHeaderProps {
  leftLink: string
  middleComponent?: ReactNode
  rightComponent?: ReactNode
}

const NavHeader: React.FC<NavHeaderProps> = props => {
  const { leftLink, middleComponent, rightComponent } = props
  return (
    <div className="nav-header-frame">
      <div className="left-col col">
        <span>
          <Link to={leftLink}>
            <Icon name="chevron left" />
          </Link>
        </span>
      </div>
      <div className="middle-col col">
        <span>{middleComponent}</span>
      </div>
      <div className="right-col col">
        <span>{rightComponent}</span>
      </div>
    </div>
  )
}

export default NavHeader
