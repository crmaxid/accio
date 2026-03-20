import { useMutation } from '@tanstack/react-query'
import { core } from '@/lib/config/api'
import { LoginFormData } from '@/schemas/auth'
import { LoginResponse } from '@/types/auth'

export const useAuth = () => {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: LoginFormData) =>
      core
        .post<LoginResponse>('/v2/auth/login', payload)
        .then((res) => res.data),
  })

  const logout = useMutation({
    mutationFn: () => core.post('/v2/auth/logout'),
  })

  return {
    login,
    logout,
  }
}
