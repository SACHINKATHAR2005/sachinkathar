import axios from 'axios'
import { useAuthStore } from './store/auth-store'

// Use env to switch between local and production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000' // https://sachinkathar.onrender.com

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Server auth middleware reads token from cookie; ensure cookies are set/sent
  withCredentials: true,
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    // Server primarily uses cookie auth; header is optional
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// API service functions
export const api = {
  // Hero/Bio endpoints
  hero: {
    getAll: () => apiClient.get('/hero/all'),
    create: (data: FormData) => apiClient.post('/hero/create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    upload: (id: string, data: FormData) => apiClient.put(`/hero/upload/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id: string) => apiClient.delete(`/hero/delete/${id}`)
  },

  // Project endpoints
  project: {
    getAll: () => apiClient.get('/project/get'),
    getById: (id: string) => apiClient.get(`/project/get/${id}`),
    create: (data: FormData) => apiClient.post('/project/create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id: string, data: FormData) => apiClient.put(`/project/update/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id: string) => apiClient.delete(`/project/delete/${id}`)
  },

  // Blog endpoints
  blog: {
    getAll: () => apiClient.get('/blog/get'),
    getById: (id: string) => apiClient.get(`/blog/get/${id}`),
    create: (data: FormData) => apiClient.post('/blog/create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id: string, data: FormData) => apiClient.put(`/blog/update/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id: string) => apiClient.delete(`/blog/delete/${id}`)
  },

  // Certificate endpoints
  certificate: {
    getAll: () => apiClient.get('/certificate/get'),
    getById: (id: string) => apiClient.get(`/certificate/get/${id}`),
    create: (data: FormData) => apiClient.post('/certificate/add', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id: string, data: FormData) => apiClient.put(`/certificate/update/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id: string) => apiClient.delete(`/certificate/delete/${id}`)
  },

  // User/Auth endpoints
  user: {
    login: (credentials: { email: string; password: string }) => 
      apiClient.post('/user/login', credentials),
    create: (userData: any) => apiClient.post('/user/create', userData),
    me: () => apiClient.get('/user/me')
  }
}
