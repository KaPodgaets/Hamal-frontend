import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import type { User } from '../../types'

interface AuthState {
  token: string | null
  user: User | null
}

const loadTokenFromStorage = (): string | null => {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

const loadUserFromToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<{ user: User }>(token)
    return decoded.user
  } catch {
    return null
  }
}

const initialState: AuthState = {
  token: loadTokenFromStorage(),
  user: loadTokenFromStorage() ? loadUserFromToken(loadTokenFromStorage()!) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload
      state.token = token
      state.user = loadUserFromToken(token)
      localStorage.setItem('token', token)
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer 