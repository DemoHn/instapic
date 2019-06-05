import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const ReleaseFrame = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const IconWrapper = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 18px;
  margin-top: 12px;
  margin-bottom: 3px;
`

const TextWrapper = styled.div`
  text-align: center;
  font-size: 12px;
  color: #bbb;
  margin-bottom: 7px;
`
const DefaultRelease: React.FC = () => {
  return (
    <ReleaseFrame>
      <IconWrapper>
        <Icon name="arrow up" />
      </IconWrapper>
      <TextWrapper>
        <span>release to go</span>
      </TextWrapper>
    </ReleaseFrame>
  )
}
export default DefaultRelease
