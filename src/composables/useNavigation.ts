import { useRouter } from 'vue-router'

export default function useNavigation() {
  const router = useRouter()
  const navigateTo = (path: string) => {
    router.push(path)
  }

  const navigationId = (name: string, id: number) => {
    router.push({ name: name, params: { id: id } })
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  return { navigateTo, navigationId, logout }
}
