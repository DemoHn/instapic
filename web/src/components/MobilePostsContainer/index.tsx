import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import MobileRefreshContainer from './refreshContainer'
import DefaultRefresh from './refresh'
import PostItemCard from '../PostItemCard'

import { PostResponse } from 'services/postService'

const CardWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
`

export interface MobilePostsContainerProps {
  topRefreshThreshold?: number
  bottomRefreshThreshold?: number
  onInit: () => Promise<[boolean, PostResponse[]]>
  onTopUpdate: () => Promise<[boolean, PostResponse[]]>
  onBottomUpdate: () => Promise<[boolean, PostResponse[]]>
}

const MobilePostsContainer: React.FC<MobilePostsContainerProps> = props => {
  const {
    topRefreshThreshold,
    bottomRefreshThreshold,
    onTopUpdate,
    onBottomUpdate,
    onInit,
  } = props
  const [posts, setPosts] = useState<PostResponse[]>([])

  useEffect(() => {
    const fetchInitData = async () => {
      const [, posts] = await onInit()
      setPosts(posts)
    }
    fetchInitData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return posts.length > 0 ? (
    <MobileRefreshContainer
      pullDownThreshold={topRefreshThreshold || 80}
      bottomRefreshThreshold={bottomRefreshThreshold || 100}
      triggerHeight={300}
      backgroundColor="white"
      onTopRefresh={async () => {
        const [, posts] = await onTopUpdate()
        setPosts(posts)
        return
      }}
      onBottomRefresh={async () => {
        const [hasMore, posts] = await onBottomUpdate()
        setPosts(posts)
        return hasMore
      }}
    >
      {posts.map((post, index) => {
        return (
          <CardWrapper key={index}>
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
  ) : (
    <DefaultRefresh />
  )
}

export default MobilePostsContainer
