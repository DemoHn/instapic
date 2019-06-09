import React, { useState, useEffect, useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
// components
import MobileNavHeader from '../components/MobileNavHeader'
import HomeFooter from '../components/HomeFooter'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
import MobilePostsContainer from '../components/MobilePostsContainer'
import DesktopPostsContainer from '../components/DesktopPostsContainer'
import { ModalFactory } from '../components/Modal'

// layouts
import MobileLayout from '../layouts/MobileLayout'
import DesktopLayout from '../layouts/DesktopLayout'
// services
import { listUserPosts, PostResponse, PostsResponse } from '../services/postService'
import { validateUserword, UserResponse } from '../services/userService'

// hooks
import useAuth from '../hooks/auth'

const usePostsModel = (
  isMobile: boolean,
  userword: string,
  triggerModal: any
): [() => Promise<any>, () => Promise<any>] => {
  const PAGE_LIMIT = isMobile ? 4 : 12

  const [posts, setPosts] = useState<PostResponse[]>([])
  const [cursor, setCursor] = useState()
  const [retry, setRetry] = useState(0)

  // get posts list from backend API
  useEffect(() => {
    const fetchData = async () => {
      const { isSuccess, error, data } = await listUserPosts(userword, PAGE_LIMIT)
      if (isSuccess) {
        const newPostsInfo = data as PostsResponse

        setPosts(newPostsInfo.posts)
        setCursor(newPostsInfo.cursor)
      } else {
        const err = error as any
        triggerModal({
          type: 'confirm',
          confirmText: 'Retry',
          title: err.title,
          description: err.description,
          onConfirm: () => {
            setRetry(retry + 1)
          },
        })
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PAGE_LIMIT, retry, userword])

  const onTopRefresh = useCallback(async () => {
    const { isSuccess, error, data } = await listUserPosts(userword, PAGE_LIMIT)
    if (isSuccess) {
      const newPostsInfo = data as PostsResponse

      setPosts(newPostsInfo.posts)
      setCursor(newPostsInfo.cursor)

      return [true, newPostsInfo.posts]
    } else {
      const err = error as any
      triggerModal({
        type: 'confirm',
        confirmText: 'Retry',
        title: err.title,
        description: err.description,
        onConfirm: () => {
          setRetry(retry + 1)
        },
      })
      return [true, []]
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PAGE_LIMIT, retry, userword])

  const onBottomRefresh = useCallback(async () => {
    const { isSuccess, error, data } = await listUserPosts(userword, PAGE_LIMIT, cursor)
    if (isSuccess) {
      const newPostsInfo = data as PostsResponse
      const hasMore = newPostsInfo.has_more
      const newPosts = [...posts, ...newPostsInfo.posts]
      setPosts(newPosts)
      setCursor(newPostsInfo.cursor)

      return [hasMore, newPosts]
    } else {
      const err = error as any
      triggerModal({
        type: 'confirm',
        confirmText: 'Retry',
        title: err.title,
        description: err.description,
        onConfirm: () => {
          setRetry(retry + 1)
        },
      })
      return [true, posts]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PAGE_LIMIT, cursor, posts, retry, userword])

  return [onTopRefresh, onBottomRefresh]
}

const useUploader = (userword: string): { userName: string } => {
  const [uploadUser, setUploadUser] = useState({
    userName: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      // fetch external user data
      const resp = await validateUserword(userword)
      if (resp.isSuccess) {
        const respData = resp.data as UserResponse
        setUploadUser({
          userName: respData.name,
        })
      }
    }

    fetchUserData()
  }, [userword])

  return uploadUser
}

// desktop styles
const Tag = styled.h2`
  padding-top: 20px;
`

export interface UserPostProps {
  match: {
    params: any
  }
  location: {
    pathname: string
  }
}

const AuthSuccessPost: React.FC<{
  authResult: any
  userword: any
}> = props => {
  const { authResult, userword } = props
  const acUserword = userword === '@me' ? authResult.userword : userword
  const uploader = useUploader(acUserword)
  // modal
  const [triggerModal, createModal] = ModalFactory.useModal()
  const [onTopRefresh, onBottomRefresh] = usePostsModel(
    isMobile,
    acUserword,
    triggerModal
  )
  return (
    <div>
      {isMobile ? (
        <MobileLayout
          header={
            <MobileNavHeader
              leftLink="/"
              middleComponent={
                <span>
                  {uploader.userName === '' ? '' : `${uploader.userName}'s Posts`}
                </span>
              }
            />
          }
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
      ) : (
        <DesktopLayout
          header={<DesktopHomeHeader hideUserBar={false} user={authResult} />}
        >
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
      )}
      {createModal()}
    </div>
  )
}

const UserPost: React.FC<UserPostProps> = ({ match, location }) => {
  const { userword } = match.params
  // user
  const authResult = useAuth()

  return authResult.hasResult ? (
    authResult.isLogin ? (
      <AuthSuccessPost userword={userword} authResult={authResult} />
    ) : (
      <Redirect
        to={{
          pathname: '/new_user',
          search: `?ref=${location.pathname}`,
        }}
      />
    )
  ) : null
}

export default UserPost
