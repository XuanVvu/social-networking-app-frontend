import useNavigation from '@/composables/useNavigation'
import { showError } from '@/utils/errorHandler'
import { AxiosInstance } from 'axios'

const { navigateTo } = useNavigation()
export const setupInterceptor = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )
  apiInstance.interceptors.response.use(
    (response: any) => {
      return response
    },
    (error: any) => {
      if (error.response && error.response.status === 403) {
        showError('Thông tin đăng nhập không chính xác, vui lòng thử lại.')
      }
      if (error.response && error.response.status === 401) {
        showError('Unauthorized access. Please login.')
        console.error('Unauthorized access, please login again.')
        localStorage.removeItem('accessToken')
        navigateTo('/login')
      }
      return Promise.reject(error)
    }
  )
}
