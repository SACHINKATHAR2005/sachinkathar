import axios from 'axios'
import { useAuthStore } from './store/auth-store'

// Determine base URL
const RENDER_PROD_URL = 'https://sachinkathar.onrender.com'
function resolveBaseUrl() {
  // Highest priority: explicit env override
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL

  // Client-side: decide by hostname
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    const isLocal = host === 'localhost' || host === '127.0.0.1'
    return isLocal ? 'http://localhost:5000' : RENDER_PROD_URL
  }

  // Server-side: use NODE_ENV
  return process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : RENDER_PROD_URL
}

export const API_BASE_URL = resolveBaseUrl()

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

  // Skill endpoints
  skill: {
    getAll: () => apiClient.get('/skill/get'),
    create: (data: FormData) => apiClient.post('/skill/create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id: string, data: FormData) => apiClient.put(`/skill/update/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id: string) => apiClient.delete(`/skill/delete/${id}`)
  },

  // User/Auth endpoints
  user: {
    login: (credentials: { email: string; password: string }) => 
      apiClient.post('/user/login', credentials),
    create: (userData: any) => apiClient.post('/user/create', userData),
    me: () => apiClient.get('/user/me')
  },

  // Contact endpoints
  contact: {
    create: (payload: { name: string; email: string; subject?: string; message: string }) =>
      apiClient.post('/contact/create', payload),
    getAll: () => apiClient.get('/contact/get'),
    delete: (id: string) => apiClient.delete(`/contact/delete/${id}`)
  },

  // Upload endpoints-
  upload: {
    image: (data: FormData) => apiClient.post('/upload/image', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
