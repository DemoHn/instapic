import React, { useState, useEffect, useCallback } from 'react'
import { isMobile } from 'react-device-detect'

// components
import MobileNavHeader from '../components/MobileNavHeader'
import HomeFooter from '../components/HomeFooter'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
import MobilePostsContainer from '../components/MobilePostsContainer'
import DesktopPostsContainer from '../components/DesktopPostsContainer'

// layouts
import MobileLayout from '../layouts/MobileLayout'
import DesktopLayout from '../layouts/DesktopLayout'
// services
import { listUserPosts, PostResponse } from '../services/postService'
import { getUser, hasToken, UserResponse } from '../services/userService'

const usePostsModel = (
  isMobile: boolean,
  userword: string
): [() => Promise<any>, () => Promise<any>] => {
  const PAGE_LIMIT = isMobile ? 4 : 12

  const [posts, setPosts] = useState<PostResponse[]>([])
  const [cursor, setCursor] = useState()

  // get posts list from backend API
  useEffect(() => {
    const fetchData = async () => {
      const { data: newPostsInfo } = await listUserPosts(userword, PAGE_LIMIT)
      setPosts(newPostsInfo.posts)
      setCursor(newPostsInfo.cursor)
    }
    fetchData()
  }, [PAGE_LIMIT, userword])

  const onTopRefresh = useCallback(async () => {
    const { data: newPostsInfo } = await listUserPosts(userword, PAGE_LIMIT)
    const updatedPosts = newPostsInfo.posts
    setPosts(updatedPosts)
    setCursor(newPostsInfo.cursor)
    return [true, updatedPosts]
  }, [PAGE_LIMIT, userword])

  const onBottomRefresh = useCallback(async () => {
    const { data: postInfo } = await listUserPosts(userword, PAGE_LIMIT, cursor)
    const hasMore = postInfo.has_more
    const updatedPosts = posts.concat(postInfo.posts)
    setPosts(updatedPosts)
    setCursor(postInfo.cursor)
    return [hasMore, updatedPosts]
  }, [PAGE_LIMIT, cursor, posts, userword])

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

const MobileUserPostPage: React.FC<{ userword: string }> = props => {
  const { userword } = props
  const [onTopRefresh, onBottomRefresh] = usePostsModel(isMobile, userword)
  const userInfo = useUserModel(false)

  const title = userInfo.isLogin ? `${userInfo.userName}'s Posts` : ''
  return (
    <MobileLayout
      header={<MobileNavHeader leftLink="/" middleComponent={<span>{title}</span>} />}
      footer={<HomeFooter />}
    >
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
  )
}

const DesktopUserPostPage: React.FC<{ userword: string }> = props => {
  const { userword } = props
  const [, onBottomRefresh] = usePostsModel(false, userword)
  const userInfo = useUserModel(false)
  return (
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
  )
}
export interface UserPostProps {
  match: {
    params: any
  }
}
const UserPost: React.FC<UserPostProps> = ({ match }) => {
  const { userword } = match.params
  return isMobile ? (
    <MobileUserPostPage userword={userword} />
  ) : (
    <DesktopUserPostPage userword={userword} />
  )
}

export default UserPost
