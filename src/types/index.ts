export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    username: string
    role: 'Admin' | 'Operator'
  }
}

export interface User {
  id: string
  username: string
  role: 'Admin' | 'Operator'
  email?: string
}

export interface Citizen {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address?: string
  status: 'pending' | 'in_progress' | 'completed'
  updatedAt: string
} 