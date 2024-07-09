import { useRouter } from 'vue-router'

export default function useNavigation() {
  const router = useRouter()
  const navigateTo = (path: string) => {
    router.push(path)
  }

  return { navigateTo }
}
