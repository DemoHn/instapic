import React, { useEffect, useState, useCallback } from 'react'
import { isMobile, BrowserView, MobileView } from 'react-device-detect'

// layouts
import DesktopLayout from '../layouts/DesktopLayout'
import MobileLayout from '../layouts/MobileLayout'
// components
import HomeFooter from '../components/HomeFooter'
import MobileHomeHeader from '../components/MobileHomeHeader'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
import MobilePostsContainer from '../components/MobilePostsContainer'
import DesktopPostsContainer from '../components/DesktopPostsContainer'

// services
import { getPosts, PostResponse } from '../services/postService'
import { getUser, hasToken, UserResponse } from '../services/userService'

const usePostsModel = (isMobile: boolean): [() => Promise<any>, () => Promise<any>] => {
  const PAGE_LIMIT = isMobile ? 4 : 12
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [cursor, setCursor] = useState()

  // get posts list from backend API
  useEffect(() => {
    const fetchData = async () => {
      const newPostsInfo = await getPosts(PAGE_LIMIT)
      setPosts(newPostsInfo.posts)
      setCursor(newPostsInfo.cursor)
    }
    fetchData()
  }, [PAGE_LIMIT])

  const onTopRefresh = useCallback(async () => {
    const newPostsInfo = await getPosts(PAGE_LIMIT)
    setPosts(newPostsInfo.posts)
    setCursor(newPostsInfo.cursor)

    return [true, newPostsInfo.posts]
  }, [PAGE_LIMIT])

  const onBottomRefresh = useCallback(async () => {
    const postInfo = await getPosts(PAGE_LIMIT, cursor)
    const hasMore = postInfo.has_more

    const newPosts = posts.concat(postInfo.posts)
    setPosts(newPosts)
    setCursor(postInfo.cursor)

    return [hasMore, newPosts]
  }, [PAGE_LIMIT, cursor, posts])

  return [onTopRefresh, onBottomRefresh]
}

const useUserModel = (isMobile: boolean) => {
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    userName: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const { isSuccess, data } = await getUser()
      if (isSuccess) {
        const respData = data as UserResponse
        setUserInfo({
          isLogin: true,
          userName: respData.name,
        })
      }
    }

    if (hasToken() && !isMobile) {
      fetchUserData()
    }
  }, [isMobile])

  return userInfo
}

const Home: React.FC = () => {
  const [onTopRefresh, onBottomRefresh] = usePostsModel(isMobile)
  const userInfo = useUserModel(isMobile)

  return (
    <>
      <BrowserView>
        <DesktopLayout header={<DesktopHomeHeader hideUserBar={false} user={userInfo} />}>
          <DesktopPostsContainer
            onInit={async () => {
              const [hasMore, updatedPosts] = await onBottomRefresh()
              return [hasMore, updatedPosts]
            }}
            onUpdate={async () => {
              const [hasMore, updatedPosts] = await onBottomRefresh()
              return [hasMore, updatedPosts]
            }}
          />
        </DesktopLayout>
      </BrowserView>
      <MobileView>
        <MobileLayout header={<MobileHomeHeader />} footer={<HomeFooter />}>
          <MobilePostsContainer
            onInit={async () => {
              const [hasMore, updatedPosts] = await onBottomRefresh()
              return [hasMore, updatedPosts]
            }}
            onTopUpdate={async () => {
              const [hasMore, updatedPosts] = await onTopRefresh()
              return [hasMore, updatedPosts]
            }}
            onBottomUpdate={async () => {
              const [hasMore, updatedPosts] = await onBottomRefresh()
              return [hasMore, updatedPosts]
            }}
          />
        </MobileLayout>
      </MobileView>
    </>
  )
}

export default Home
