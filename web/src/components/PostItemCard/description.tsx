import React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'
import moment from 'moment'
import './description.scss'

export interface DescriptionProps {
  userName: string
  userLink: string
  postTimestamp: number
}

const Description: React.FC<DescriptionProps> = props => {
  const { userName, userLink, postTimestamp } = props
  return (
    <div className="desc-frame">
      <div className="desc-block">{props.children || ''}</div>
      <Divider fitted />
      <div className="user-block">
        <span className="user-name">
          <Link to={userLink}>
            <span className="label">{userName}</span>
          </Link>
        </span>
        <span className="post-time">
          <span className="label">{moment(postTimestamp).fromNow()}</span>
        </span>
      </div>
    </div>
  )
}

export default Description
