import axios from 'axios'
import { Response } from './types'
import { getAuthHeader } from './userService'

export interface ImageResponse {
  id: number
  url: string
}

export function uploadImage(formData: any): Promise<Response<ImageResponse>> {
  return axios
    .post('/api/v1.0/images', formData, {
      headers: {
        ...getAuthHeader(),
        'content-type': 'multipart/form-data',
      },
    })
    .then((resp: any) => ({
      isSuccess: true,
      data: resp.data,
    }))
}
