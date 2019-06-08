import React from 'react'
import { storiesOf } from '@storybook/react'
import ImageUpload from './index'
import styled from 'styled-components'

const expUploadAction = () => {
  return Promise.resolve('url')
}

const Frame = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  height: 300px;
  width: 300px;
`
storiesOf('ImageUpload', module).add('default', () => (
  <Frame>
    <ImageUpload uploadAction={expUploadAction} identifier="idf" />
  </Frame>
))
