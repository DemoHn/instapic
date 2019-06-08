import { AxiosResponse, AxiosError } from 'axios'
import { mapKnownError, mapNetworkError, mapFatalError } from './errorMapper'

export interface Response<T = {}> {
  isSuccess: boolean
  // only show response data if succeed
  data?: T
  // only show error if failed, should be remapped
  error?: {
    code: number
    title: string
    description: string
  }
}

export function handleSuccess<T>(resp: AxiosResponse<T>): Response<T> {
  return {
    isSuccess: true,
    data: resp.data,
  }
}

export function handleError<T>(err: AxiosError<T>): Response<T> {
  if (err.response) {
    return {
      isSuccess: false,
      error: mapKnownError(err.response.data),
    }
  } else if (err.request) {
    return {
      isSuccess: false,
      error: mapNetworkError(),
    }
  } else {
    return {
      isSuccess: false,
      error: mapFatalError(),
    }
  }
}
