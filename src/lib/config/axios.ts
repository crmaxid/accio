import axios, { type AxiosInstance, type AxiosError } from 'axios'

let csrfToken: string | null = null
let csrfTokenPromise: Promise<string | null> | null = null

const getCsrfToken = (): Promise<string | null> => {
  if (csrfTokenPromise) return csrfTokenPromise

  csrfTokenPromise = axios
    .get<{ data: { csrfToken: string } }>('/core/v1/auth/csrf-token', {
      withCredentials: true,
    })
    .then((res) => {
      csrfToken = res.data.data.csrfToken
      return csrfToken
    })
    .catch(() => null)
    .finally(() => {
      csrfTokenPromise = null
    })

  return csrfTokenPromise
}

export function createApiInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  instance.interceptors.request.use(async (config) => {
    const isLoginPath = config.url?.includes('/login')
    const isCsrfPath = config.url?.includes('/csrf-token')
    const isModifying = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(
      config.method?.toUpperCase() ?? '',
    )

    if (isLoginPath || isCsrfPath || !isModifying) return config

    if (!csrfToken) await getCsrfToken()
    if (csrfToken) config.headers['x-csrf-token'] = csrfToken

    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError & { config?: { _retry?: boolean } }) => {
      const isLoginPath = error.config?.url?.includes('/login')
      const isCsrfPath = error.config?.url?.includes('/csrf-token')
      const isAlreadyRetried = error.config?._retry

      if (
        error.response?.status === 403 &&
        !isLoginPath &&
        !isCsrfPath &&
        !isAlreadyRetried &&
        error.config
      ) {
        error.config._retry = true
        csrfToken = null
        await getCsrfToken()
        if (csrfToken) {
          error.config.headers['x-csrf-token'] = csrfToken
          return instance.request(error.config)
        }
      }

      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }

      return Promise.reject(error)
    },
  )

  return instance
}
