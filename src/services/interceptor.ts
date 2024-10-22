import useNavigation from '@/composables/useNavigation'
import { showError } from '@/utils/errorHandler'

const { navigateTo } = useNavigation()
export const setupInterceptor = (apiInstance: any) => {
  apiInstance.interceptor.request.use(
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
  apiInstance.interceptor.response.use(
    (response: any) => {
      return response
    },
    (error: any) => {
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
