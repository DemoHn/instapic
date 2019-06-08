import React, { useState, useRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Button, Divider } from 'semantic-ui-react'

// components
import MobileNavHeader from '../components/MobileNavHeader'
import PostButton from '../components/PostButton'
import NewPostForm from '../components/NewPostForm'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
// layouts
import MobileLayout from '../layouts/MobileLayout'
import DesktopLayout from '../layouts/DesktopLayout'

// services
import { getUser, hasToken, UserResponse } from '../services/userService'
import { newPost } from '../services/postService'
import { uploadImage } from '../services/imageService'

const useUserModel = () => {
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

    if (hasToken()) {
      fetchUserData()
    }
  }, [])

  return userInfo
}

interface PostPageProps {
  onSubmit: (x: { description: string; imageIds: number[] }) => any
  onImageUpload: (file: any) => Promise<{ id: number; url: string }>
}
const DesktopNewPostPage: React.FC<PostPageProps> = props => {
  const userInfo = useUserModel()

  const postRef = useRef(null)
  const { onSubmit, onImageUpload } = props
  return (
    <DesktopLayout header={<DesktopHomeHeader hideUserBar={false} user={userInfo} />}>
      <h2>New Post</h2>
      <Divider />
      <NewPostForm ref={postRef} imgColumnItems={4} uploadAction={onImageUpload} />
      <Button
        primary
        onClick={() => {
          if (postRef.current) {
            const current = postRef.current as any
            onSubmit(current.getFormData())
          }
        }}
      >
        Submit
      </Button>
    </DesktopLayout>
  )
}

const MobileNewPostPage: React.FC<PostPageProps> = props => {
  const title = 'New Post'
  const postRef = useRef(null)
  const { onSubmit, onImageUpload } = props
  return (
    <MobileLayout
      header={
        <MobileNavHeader
          leftLink="/"
          middleComponent={<span>{title}</span>}
          rightComponent={
            <PostButton
              onClick={() => {
                if (postRef.current) {
                  const current = postRef.current as any
                  onSubmit(current.getFormData())
                }
              }}
            >
              submit
            </PostButton>
          }
        />
      }
      footer={null}
      showFooter={false}
    >
      <NewPostForm ref={postRef} imgColumnItems={2} uploadAction={onImageUpload} />
    </MobileLayout>
  )
}

const NewPost: React.FC = () => {
  const onSubmit = async (formData: any) => {
    const { isSuccess } = await newPost(formData.description, formData.imageIds)
    console.log(isSuccess)
  }

  const onImageUpload = async (file: any) => {
    const formData = new FormData()
    formData.append('image', file)

    const { data } = await uploadImage(formData)

    return data
  }
  return isMobile ? (
    <MobileNewPostPage onSubmit={onSubmit} onImageUpload={onImageUpload} />
  ) : (
    <DesktopNewPostPage onSubmit={onSubmit} onImageUpload={onImageUpload} />
  )
}

export default NewPost
