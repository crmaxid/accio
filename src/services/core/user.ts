import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { core } from '@/lib'
import { useUserStore } from '@/stores/user.store'
import { UserInforResponse } from '@/types'

const USER_QUERY_KEY = 'user'

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser)

  const getUser = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () =>
      core.get<UserInforResponse>('/v1/user/info').then((res) => res.data),
  })

  useEffect(() => {
    if (getUser.data) setUser(getUser.data.data)
    else if (getUser.isError) setUser(null)
  }, [getUser.data, getUser.isError, setUser])

  return { getUser }
}
