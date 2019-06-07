import axios from 'axios'
import { Response } from './types'
import { getAuthHeader } from './userService'
export interface UserResponse {
  id: number
  name: string
  userword: string
}

export interface PostResponse {
  id: number
  created_at: number
  description: string
  image_urls: string[]
  user: UserResponse
}

export interface PostsResponse {
  cursor: number | null
  has_more: boolean
  posts: PostResponse[]
}
export function getPosts(limit?: number, cursor?: number): Promise<PostsResponse> {
  return axios
    .get('/api/v1.0/posts', {
      params: {
        limit,
        cursor,
      },
    })
    .then(resp => resp.data as PostsResponse)
}

export function listUserPosts(
  userword: string,
  limit?: number,
  cursor?: number
): Promise<Response<PostsResponse>> {
  return axios
    .get(`/api/v1.0/posts/${userword}`, {
      params: {
        limit,
        cursor,
      },
      headers: getAuthHeader(),
    })
    .then(resp => ({
      isSuccess: true,
      data: resp.data,
    }))
}
