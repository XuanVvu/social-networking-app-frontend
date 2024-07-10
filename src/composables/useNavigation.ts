import { useRouter } from 'vue-router'

export default function useNavigation() {
  const router = useRouter()
  const navigateTo = (path: string) => {
    router.push(path)
  }

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return { navigateTo, logout }
}
