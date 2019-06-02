// HomeHeader is used in both mobile & desktop version
// only shown in home page (since mobile page will be different)
import React from 'react'
import MobileHomeHeader from './mobile'
import DesktopHomeHeader from './desktop'
import { UserDropdownProps } from '../UserDropdown'

export interface HomeHeaderProps {
  isMobile: boolean
  userInfo: UserDropdownProps
}
const HomeHeader: React.FC<HomeHeaderProps> = props => {
  const { isMobile, userInfo } = props
  return isMobile ? <MobileHomeHeader /> : <DesktopHomeHeader {...userInfo} />
}

export default HomeHeader
