import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from '@/constants/baseUrl'
import { setupInterceptor } from '@/services/interceptor'

class callApi {
  private api: AxiosInstance
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setupInterceptor(this.api)
  }

  setToken(token: string) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async get(url: string, config = {}) {
    try {
      const response = await this.api.get(url, config)
      return response.data
    } catch (error) {
      console.error('GET Error:', error)
      throw error
    }
  }

  async post<T>(url: string, data: T, config = {}) {
    try {
      const response = await this.api.post(url, data, config)
      return response
    } catch (error) {
      console.error('POST Error:', error)
      throw error
    }
  }

  async put<T>(url: string, data: T, config = {}) {
    try {
      const response = await this.api.put(url, data, config)
      return response
    } catch (error) {
      console.error('PUT Error:', error)
      throw error
    }
  }

  async delete(url: string, config = {}) {
    try {
      const response = await this.api.delete(url, config)
      return response
    } catch (error) {
      console.error('DELETE Error:', error)
      throw error
    }
  }

  setHeader(header: string, value: string) {
    // this.api.defaults.headers.common[header] = value
    axios.interceptors.request.use(
      (config) => {
        config.headers[header] = `Bearer ${value}`
        return config
      },

      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

export default new callApi()
