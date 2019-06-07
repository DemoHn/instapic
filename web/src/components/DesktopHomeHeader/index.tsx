import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import UserDropdown, { UserDropdownProps } from '../UserDropdown'
// Since typescript do not support 'import' assets at all-=-
const logo = require('assets/logo.png')

const Frame = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`

export interface DesktopHomeHeaderProps {
  user: UserDropdownProps
  hideUserBar: boolean
}

const DesktopHomeHeader: React.FC<DesktopHomeHeaderProps> = props => {
  const { user, hideUserBar } = props
  return (
    <Frame>
      <Link to="/">
        <img src={logo} alt="logo" height={36} />
      </Link>
      {!hideUserBar ? <UserDropdown {...user} /> : null}
    </Frame>
  )
}

export default DesktopHomeHeader
