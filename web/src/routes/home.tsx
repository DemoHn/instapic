import React, { useEffect, useState } from 'react'
import { isMobile, BrowserView, MobileView } from 'react-device-detect'
// layouts
import DesktopLayout from '../layouts/DesktopLayout'
import MobileLayout from '../layouts/MobileLayout'
// components
import HomeFooter from '../components/HomeFooter'
import HomeHeader from '../components/HomeHeader'
import PostItemCard from '../components/PostItemCard'

// services
import { getPosts, PostsResponse } from '../services/postService'

const userInfo = {
  isLogin: true,
  userName: 'Hello World',
}
const getHomeHeader = () => {
  return <HomeHeader isMobile={isMobile} userInfo={userInfo} />
}
const Home: React.FC = () => {
  const [data, setData] = useState<PostsResponse>()
  const [cursor, setCursor] = useState(null)
  const limitPerPage = isMobile ? 4 : 12
  // get posts list from backend API
  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts(limitPerPage)
      setData(posts)
    }
    fetchData()
  }, [limitPerPage])

  return (
    <>
      <BrowserView>
        <DesktopLayout header={getHomeHeader()}>{JSON.stringify(data)}</DesktopLayout>
      </BrowserView>
      <MobileView>
        <MobileLayout header={getHomeHeader()} footer={<HomeFooter />}>
          {data
            ? data.posts.map(post => {
                return (
                  <PostItemCard
                    postTimestamp={post.created_at}
                    images={post.image_urls}
                    description={post.description}
                    user={{
                      name: post.user.name,
                      link: post.user.userword,
                    }}
                  />
                )
              })
            : null}
        </MobileLayout>
      </MobileView>
    </>
  )
}

export default Home
