import { ref } from 'vue'

export const visible = ref(false)
export const errorMessage = ref('')
export const handleClose = () => {
  visible.value = false
}

export const showError = (msg: string) => {
  errorMessage.value = msg
  visible.value = true
}
