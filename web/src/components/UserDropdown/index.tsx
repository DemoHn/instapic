import React from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

// styles
const DropdownFrame = styled.span`
  display: inline-block;
  font-size: 1.1em;
`
const IconSpace = styled.span`
  display: inline-block;
  width: 10px;
`
const Label = styled.span`
  display: inline-block;
  width: 60px;
  text-align: left;
`

export interface UserDropdownProps {
  isLogin: boolean
  userName?: string
}

const UserDropdown: React.FC<UserDropdownProps> = props => {
  const { isLogin, userName } = props

  return (
    <DropdownFrame>
      <Icon name="user outline" />
      {!isLogin ? null : (
        <span>
          <IconSpace />
          <Dropdown text={userName || ''} compact={true}>
            <Dropdown.Menu direction="left">
              <Dropdown.Item>
                <span>
                  <Icon.Group>
                    <Icon name="file image outline" />
                    <Icon corner name="add" />
                  </Icon.Group>
                  <IconSpace />
                  <Label>New Post</Label>
                </span>
              </Dropdown.Item>
              <Dropdown.Item>
                <span>
                  <Icon.Group>
                    <Icon name="user circle outline" />
                  </Icon.Group>
                  <IconSpace />
                  <Label>Logout</Label>
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      )}
    </DropdownFrame>
  )
}

export default UserDropdown
