import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

// components
import MobileNavHeader from '../components/MobileNavHeader'
import HomeFooter from '../components/HomeFooter'
import PostItemCard from '../components/PostItemCard'
import MobileRefreshContainer from '../components/MobileRefreshContainer'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
// layouts
import MobileLayout from '../layouts/MobileLayout'
import DesktopLayout from '../layouts/DesktopLayout'
// services
import { listUserPosts, PostResponse } from '../services/postService'
import { getUser, hasToken, UserResponse } from '../services/userService'

const usePostsModel = (
  isMobile: boolean,
  userword: string
): [PostResponse[], () => Promise<any>, () => Promise<boolean>] => {
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
    setPosts(newPostsInfo.posts)
    setCursor(newPostsInfo.cursor)

    return true
  }, [PAGE_LIMIT, userword])

  const onBottomRefresh = useCallback(async () => {
    const { data: postInfo } = await listUserPosts(userword, PAGE_LIMIT, cursor)
    const hasMore = postInfo.has_more
    setPosts(posts.concat(postInfo.posts))
    setCursor(postInfo.cursor)
    return hasMore
  }, [PAGE_LIMIT, cursor, posts, userword])

  return [posts, onTopRefresh, onBottomRefresh]
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

const CardWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
`

const DesktopCardContainer = styled.div`
  display: flex;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  flex-flow: column wrap;
  flex-wrap: wrap;
  flex-direction: row;
`

const DesktopCardWrapper = styled.div`
  width: 32.5%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
`

const MobileUserPostPage: React.FC<{ userword: string }> = props => {
  const { userword } = props
  const [posts, onTopRefresh, onBottomRefresh] = usePostsModel(isMobile, userword)
  const userInfo = useUserModel(false)

  const title = userInfo.isLogin ? `${userInfo.userName}'s Posts` : ''
  return (
    <MobileLayout
      header={<MobileNavHeader leftLink="/" middleComponent={<span>{title}</span>} />}
      footer={<HomeFooter />}
    >
      {posts.length > 0 ? (
        <MobileRefreshContainer
          pullDownThreshold={80}
          bottomRefreshThreshold={100}
          triggerHeight={300}
          backgroundColor="white"
          onTopRefresh={onTopRefresh}
          onBottomRefresh={onBottomRefresh}
        >
          {posts.map(post => {
            return (
              <CardWrapper>
                <PostItemCard
                  postTimestamp={post.created_at}
                  images={post.image_urls}
                  description={post.description}
                  user={{
                    name: post.user.name,
                    link: `users/${post.user.userword}`,
                  }}
                />
              </CardWrapper>
            )
          })}
        </MobileRefreshContainer>
      ) : null}
    </MobileLayout>
  )
}

const DesktopUserPostPage: React.FC<{ userword: string }> = props => {
  const { userword } = props
  const [posts, , onBottomRefresh] = usePostsModel(false, userword)
  const userInfo = useUserModel(false)
  return (
    <DesktopLayout header={<DesktopHomeHeader hideUserBar={false} user={userInfo} />}>
      <DesktopCardContainer>
        {posts.map(post => {
          return (
            <DesktopCardWrapper>
              <PostItemCard
                postTimestamp={post.created_at}
                images={post.image_urls}
                description={post.description}
                user={{
                  name: post.user.name,
                  link: `/users/${post.user.userword}`,
                }}
              />
            </DesktopCardWrapper>
          )
        })}
      </DesktopCardContainer>
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
