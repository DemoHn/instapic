export interface Response<T = {}> {
  isSuccess: boolean
  // only show response data if succeed
  data: T
  // only show error if failed, should be remapped
  error?: {
    code: number
    title: string
    description: string
  }
}
