import React, { useEffect, useState, useCallback } from 'react'
import { isMobile, BrowserView, MobileView } from 'react-device-detect'
import styled from 'styled-components'

// layouts
import DesktopLayout from '../layouts/DesktopLayout'
import MobileLayout from '../layouts/MobileLayout'
// components
import HomeFooter from '../components/HomeFooter'
import MobileHomeHeader from '../components/MobileHomeHeader'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
import PostItemCard from '../components/PostItemCard'
import MobileRefreshContainer from '../components/MobileRefreshContainer'

// services
import { getPosts, PostResponse } from '../services/postService'
import { getUser, hasToken, UserResponse } from '../services/userService'

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

const usePostsModel = (
  isMobile: boolean
): [PostResponse[], () => Promise<any>, () => Promise<boolean>] => {
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

    return true
  }, [PAGE_LIMIT])

  const onBottomRefresh = useCallback(async () => {
    const postInfo = await getPosts(PAGE_LIMIT, cursor)
    const hasMore = postInfo.has_more
    setPosts(posts.concat(postInfo.posts))
    setCursor(postInfo.cursor)
    return hasMore
  }, [PAGE_LIMIT, cursor, posts])

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

const Home: React.FC = () => {
  const [posts, onTopRefresh, onBottomRefresh] = usePostsModel(isMobile)
  const userInfo = useUserModel(isMobile)
  return (
    <>
      <BrowserView>
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
      </BrowserView>
      <MobileView>
        <MobileLayout header={<MobileHomeHeader />} footer={<HomeFooter />}>
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
      </MobileView>
    </>
  )
}

export default Home
