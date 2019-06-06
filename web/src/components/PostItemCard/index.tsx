import React from 'react'
import Slider from './slider'
import Description from './description'
import styled from 'styled-components'

export interface PostItemCardProps {
  user: {
    name: string
    link: string
  }
  postTimestamp: number
  description?: string
  images: string[]
}

const CardFrame = styled.div`
  -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
`
const PostItemCard: React.FC<PostItemCardProps> = props => {
  const { images, user, description, postTimestamp } = props
  return (
    <CardFrame>
      <Slider sources={images} />
      <Description
        userName={user.name}
        userLink={user.link}
        postTimestamp={postTimestamp}
      >
        {description}
      </Description>
    </CardFrame>
  )
}

export default PostItemCard
