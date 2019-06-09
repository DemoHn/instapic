import axios from 'axios'
import { Response, handleSuccess, handleError } from './respHelper'
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
export function getPosts(
  limit?: number,
  cursor?: number
): Promise<Response<PostsResponse>> {
  return axios
    .get('/api/v1.0/posts', {
      params: {
        limit,
        cursor,
      },
    })
    .then(data => handleSuccess<PostsResponse>(data))
    .catch(err => handleError<PostsResponse>(err))
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

export function newPost(
  description: string,
  imageIds: number[]
): Promise<Response<PostResponse>> {
  return axios
    .post(
      '/api/v1.0/posts',
      {
        description,
        image_ids: imageIds,
      },
      {
        headers: getAuthHeader(),
      }
    )
    .then(resp => ({
      isSuccess: true,
      data: resp.data,
    }))
}
