import { AxiosResponse } from 'axios'

export function unsafeAxiosMapper<T, U = T>(res: AxiosResponse<U>) {
  return res.data as unknown as T
}