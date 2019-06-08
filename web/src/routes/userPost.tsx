import React, { useState, useEffect, useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'

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
import { listUserPosts, PostResponse, PostsResponse } from '../services/postService'
import {
  getUser,
  validateUserword,
  hasToken,
  UserResponse,
} from '../services/userService'

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
      const { data } = await listUserPosts(userword, PAGE_LIMIT)
      const newPostsInfo = data as PostsResponse
      setPosts(newPostsInfo.posts)
      setCursor(newPostsInfo.cursor)
    }
    fetchData()
  }, [PAGE_LIMIT, userword])

  const onTopRefresh = useCallback(async () => {
    const { data } = await listUserPosts(userword, PAGE_LIMIT)
    const newPostsInfo = data as PostsResponse
    const updatedPosts = newPostsInfo.posts
    setPosts(updatedPosts)
    setCursor(newPostsInfo.cursor)
    return [true, updatedPosts]
  }, [PAGE_LIMIT, userword])

  const onBottomRefresh = useCallback(async () => {
    const { data } = await listUserPosts(userword, PAGE_LIMIT, cursor)
    const postInfo = data as PostsResponse
    const hasMore = postInfo.has_more
    const updatedPosts = posts.concat(postInfo.posts)
    setPosts(updatedPosts)
    setCursor(postInfo.cursor)
    return [hasMore, updatedPosts]
  }, [PAGE_LIMIT, cursor, posts, userword])

  return [onTopRefresh, onBottomRefresh]
}

const useUserModel = (
  userword: string
): [{ isLogin: boolean; userName: string }, { userName: string }] => {
  const [currentUser, setCurrentUser] = useState({
    isLogin: false,
    userName: '',
  })

  const [uploadUser, setUploadUser] = useState({
    userName: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const { isSuccess, data } = await getUser()
      if (isSuccess) {
        const respData = data as UserResponse
        setCurrentUser({
          isLogin: true,
          userName: respData.name,
        })
      }

      // fetch external user data
      const resp = await validateUserword(userword)
      if (resp.isSuccess) {
        const respData = resp.data as UserResponse
        setUploadUser({
          userName: respData.name,
        })
      }
    }

    if (hasToken()) {
      fetchUserData()
    }
  }, [userword])

  return [currentUser, uploadUser]
}

const MobileUserPostPage: React.FC<{ userword: string }> = props => {
  const { userword } = props
  const [onTopRefresh, onBottomRefresh] = usePostsModel(isMobile, userword)
  const [, uploader] = useUserModel(userword)

  const title = uploader.userName === '' ? '' : `${uploader.userName}'s Posts`
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

// desktop styles
const Tag = styled.h2`
  padding-top: 20px;
`

const DesktopUserPostPage: React.FC<{ userword: string }> = props => {
  const { userword } = props
  const [, onBottomRefresh] = usePostsModel(false, userword)
  const [userInfo, uploader] = useUserModel(userword)
  return (
    <DesktopLayout header={<DesktopHomeHeader hideUserBar={false} user={userInfo} />}>
      {uploader.userName === '' ? null : <Tag>{uploader.userName}'s Posts</Tag>}
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
