import React from 'react'
import { isMobile, BrowserView, MobileView } from 'react-device-detect'
// layouts
import DesktopLayout from '../layouts/DesktopLayout'
import MobileLayout from '../layouts/MobileLayout'
// components
import HomeFooter from '../components/HomeFooter'
import HomeHeader from '../components/HomeHeader'

const userInfo = {
  isLogin: true,
  userName: 'Hello World',
}
const getHomeHeader = () => {
  return <HomeHeader isMobile={isMobile} userInfo={userInfo} />
}
const Home: React.FC = () => {
  return (
    <>
      <BrowserView>
        <DesktopLayout header={getHomeHeader()}>A</DesktopLayout>
      </BrowserView>
      <MobileView>
        <MobileLayout header={getHomeHeader()} footer={<HomeFooter />}>
          B
        </MobileLayout>
      </MobileView>
    </>
  )
}

export default Home
