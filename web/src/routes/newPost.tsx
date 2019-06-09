import React, { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
// components
import MobileNavHeader from '../components/MobileNavHeader'
import PostButton from '../components/PostButton'
import NewPostForm from '../components/NewPostForm'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
// layouts
import MobileLayout from '../layouts/MobileLayout'
import DesktopLayout from '../layouts/DesktopLayout'

// services
import { newPost } from '../services/postService'
import { uploadImage, ImageResponse } from '../services/imageService'

// hooks
import useAuth from '../hooks/auth'

interface PostPageProps {
  onSubmit: (x: { description: string; imageIds: number[] }) => any
  onImageUpload: (file: any) => Promise<{ id: number; url: string }>
}

const Tag = styled.h2`
  padding-top: 20px;
`
const DesktopNewPostPage: React.FC<PostPageProps & { user: any }> = props => {
  const postRef = useRef(null)
  const { onSubmit, onImageUpload } = props
  return (
    <DesktopLayout header={<DesktopHomeHeader hideUserBar={false} user={props.user} />}>
      <Tag>New Post</Tag>
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

const onSubmit = async (formData: any) => {
  const { isSuccess } = await newPost(formData.description, formData.imageIds)
  console.log(isSuccess)
}

const onImageUpload = async (file: any) => {
  const formData = new FormData()
  formData.append('image', file)

  const { data } = await uploadImage(formData)

  return data as ImageResponse
}
const NewPost: React.FC = () => {
  const authResult = useAuth((err: any) => {})

  return authResult.hasResult ? (
    authResult.isLogin ? (
      isMobile ? (
        <MobileNewPostPage onSubmit={onSubmit} onImageUpload={onImageUpload} />
      ) : (
        <DesktopNewPostPage
          onSubmit={onSubmit}
          onImageUpload={onImageUpload}
          user={authResult}
        />
      )
    ) : (
      <Redirect
        to={{
          pathname: '/new_user',
          search: '?ref=/new_post',
        }}
      />
    )
  ) : null
}

export default NewPost
