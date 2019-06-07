import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import PostItemCard from '../PostItemCard'
// services
import { PostResponse } from '../../services/postService'

const loading = require('../../assets/loading.svg')

export interface DesktopPostsContainerProps {
  refreshThreshold?: number
  onInit: () => Promise<[boolean, PostResponse[]]>
  onUpdate: (hasMore: boolean) => Promise<[boolean, PostResponse[]]>
}

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

const Loader: React.FC = () => {
  const Wrapper = styled.div`
    justify-content: center;
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
  `

  return (
    <Wrapper>
      <img src={loading} alt="" height={30} />
    </Wrapper>
  )
}

const TheEndIndicator: React.FC = () => {
  const PulldownFrame = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60px;
  `

  const TextWrapper = styled.div`
    text-align: center;
    font-size: 16px;
    color: #bbb;
  `
  return (
    <PulldownFrame>
      <TextWrapper>
        <span>-- The End --</span>
      </TextWrapper>
    </PulldownFrame>
  )
}

const DesktopPostsContainer: React.FC<DesktopPostsContainerProps> = props => {
  const { refreshThreshold, onUpdate, onInit } = props
  // refs
  const containerRef = useRef(null)
  // states
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [triggerRefresh, setTriggerRefresh] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  useEffect(() => {
    const initData = async () => {
      const [newHasMore, newPosts] = await onInit()
      setHasMore(newHasMore)
      setPosts(newPosts)
    }

    initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleScroll = useCallback(() => {
    const threshold = refreshThreshold || 60
    // get outer height
    if (!containerRef) {
      return
    }
    // @ts-ignore
    const containerHeight = containerRef.current.clientHeight
    const windowHeight = window.innerHeight
    const scrollHeight = window.scrollY
    // even trigger the breach line
    if (windowHeight + scrollHeight - containerHeight > threshold) {
      setTriggerRefresh(true)
    }
    if (windowHeight + scrollHeight <= containerHeight) {
      setTriggerRefresh(false)
    }

    if (triggerRefresh && hasMore) {
      return onUpdate(hasMore).then(([newHasMore, newPosts]) => {
        setPosts(newPosts)
        setHasMore(newHasMore)
        // refresh state
        setTriggerRefresh(false)
      })
    }

    return
  }, [hasMore, onUpdate, refreshThreshold, triggerRefresh])

  return (
    <DesktopCardContainer ref={containerRef}>
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
      {hasMore ? <Loader /> : <TheEndIndicator />}
    </DesktopCardContainer>
  )
}

export default DesktopPostsContainer
