import React from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
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
      <span>
        <IconSpace />
        <Dropdown text={userName || ''} compact={true}>
          <Dropdown.Menu direction="left">
            {!isLogin ? (
              <Dropdown.Item>
                <Link to="/new_user">
                  <Icon.Group>
                    <Icon name="user circle outline" />
                  </Icon.Group>
                  <IconSpace />
                  <Label>Register / Login</Label>
                </Link>
              </Dropdown.Item>
            ) : null}
            <Dropdown.Item>
              <Link to="/new_post">
                <Icon.Group>
                  <Icon name="file image outline" />
                  <Icon corner name="add" />
                </Icon.Group>
                <IconSpace />
                <Label>New Post</Label>
              </Link>
            </Dropdown.Item>
            {isLogin ? (
              <Dropdown.Item>
                <Link to="/logout">
                  <Icon.Group>
                    <Icon name="user circle outline" />
                  </Icon.Group>
                  <IconSpace />
                  <Label>Logout</Label>
                </Link>
              </Dropdown.Item>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
      </span>
    </DropdownFrame>
  )
}

export default UserDropdown
