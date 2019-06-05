import React from 'react'
import styled from 'styled-components'

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
  font-size: 14px;
  color: #bbb;
`
const DefaultBottomEnd: React.FC = () => {
  return (
    <PulldownFrame>
      <TextWrapper>
        <span>nothing more</span>
      </TextWrapper>
    </PulldownFrame>
  )
}
export default DefaultBottomEnd
