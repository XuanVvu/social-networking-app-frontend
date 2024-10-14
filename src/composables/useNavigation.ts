import { useRouter } from 'vue-router'

export default function useNavigation() {
  const router = useRouter()
  const navigateTo = (path: string) => {
    router.push(path)
  }

  const navigationId = (name: string, id: number) => {
    router.push({ name: name, params: { id: id } })
  }

  const navigationWithQuery = (path: string, queryText: string, queryContent: string) => {
    router.push({ path: path, query: { [queryText]: queryContent } })
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  return { navigateTo, navigationId, logout, navigationWithQuery }
}
