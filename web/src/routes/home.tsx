import React, { useEffect, useState, useCallback, useRef } from 'react'
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
import Modal from '../components/Modal'
// services
import { getPosts, PostResponse, PostsResponse } from '../services/postService'

// hooks
import useAuth from '../hooks/auth'

const usePostsModel = (
  isMobile: boolean,
  triggerModal: any
): [() => Promise<any>, () => Promise<any>] => {
  const PAGE_LIMIT = isMobile ? 4 : 12
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [cursor, setCursor] = useState()

  // get posts list from backend API
  useEffect(() => {
    const fetchData = async () => {
      const { isSuccess, error, data } = await getPosts(PAGE_LIMIT)
      if (isSuccess) {
        const newPostsInfo = data as PostsResponse

        setPosts(newPostsInfo.posts)
        setCursor(newPostsInfo.cursor)
      } else {
        triggerModal(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PAGE_LIMIT])

  const onTopRefresh = useCallback(async () => {
    const { isSuccess, error, data } = await getPosts(PAGE_LIMIT)
    if (isSuccess) {
      const newPostsInfo = data as PostsResponse

      setPosts(newPostsInfo.posts)
      setCursor(newPostsInfo.cursor)

      return [true, newPostsInfo.posts]
    } else {
      triggerModal(error)
      return [true, []]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PAGE_LIMIT])

  const onBottomRefresh = useCallback(async () => {
    const { isSuccess, error, data } = await getPosts(PAGE_LIMIT, cursor)
    if (isSuccess) {
      const newPostsInfo = data as PostsResponse
      const hasMore = newPostsInfo.has_more
      const newPosts = [...posts, ...newPostsInfo.posts]
      setPosts(newPosts)
      setCursor(newPostsInfo.cursor)

      return [hasMore, newPosts]
    } else {
      triggerModal(error)
      return [true, []]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PAGE_LIMIT, cursor])

  return [onTopRefresh, onBottomRefresh]
}

const useErrorModal = (): [(err: any, callback: any) => any, () => any] => {
  const errorModalRef = useRef(null)

  const [error, setError] = useState({
    title: '',
    description: '',
  })

  const renderModal = () => {
    return (
      <Modal
        type="confirm"
        ref={errorModalRef}
        title={error.title}
        description={error.description}
      />
    )
  }

  const triggerModal = (err: any) => {
    setError(err)
    setTimeout(() => {
      if (errorModalRef.current) {
        // @ts-ignore
        errorModalRef.current.trigger()
      }
    }, 200)
  }

  return [triggerModal, renderModal]
}

const Home: React.FC = () => {
  const [triggerModal, renderModal] = useErrorModal()
  const [onTopRefresh, onBottomRefresh] = usePostsModel(isMobile, triggerModal)
  const authResult = useAuth()

  return (
    <>
      <BrowserView>
        <DesktopLayout
          header={<DesktopHomeHeader hideUserBar={false} user={authResult} />}
        >
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

      {renderModal()}
    </>
  )
}

export default Home
