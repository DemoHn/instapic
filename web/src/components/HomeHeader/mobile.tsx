import React from 'react'
import styled from 'styled-components'
// Since typescript do not support 'import' assets at all-=-
const logo = require('assets/logo.png')

const Frame = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  flex-direction: column;
  justify-content: center;
`

const MobileHomeHeader: React.FC = () => {
  return (
    <Frame>
      <img src={logo} alt={'logo'} height={36} />
    </Frame>
  )
}

export default MobileHomeHeader
