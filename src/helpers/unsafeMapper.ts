import { AxiosResponse } from 'axios'

export function unsafeMapper<T, U = T>(res: U) {
  return res as unknown as T
}
export function unsafeAxiosMapper<T, U = T>(res: AxiosResponse<U>) {
  return res.data as unknown as T
}