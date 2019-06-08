import axios from 'axios'
import { Response, handleSuccess, handleError } from './respHelper'
import { getAuthHeader } from './userService'

export interface ImageResponse {
  id: number
  url: string
}

export const uploadImage = (formData: any): Promise<Response<ImageResponse>> =>
  axios
    .post('/api/v1.0/images', formData, {
      headers: {
        ...getAuthHeader(),
        'content-type': 'multipart/form-data',
      },
    })
    .then(data => handleSuccess<ImageResponse>(data))
    .catch(err => handleError<ImageResponse>(err))
