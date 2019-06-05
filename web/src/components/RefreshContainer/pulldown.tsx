import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const PulldownFrame = styled.div`
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
const DefaultPulldown: React.FC = () => {
  return (
    <PulldownFrame>
      <IconWrapper>
        <Icon name="arrow down" />
      </IconWrapper>
      <TextWrapper>
        <span>pull down to fefresh</span>
      </TextWrapper>
    </PulldownFrame>
  )
}
export default DefaultPulldown
