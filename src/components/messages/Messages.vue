<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import callApi from '@/services/api'
import MessageBox from './MessageBox.vue'
import io from 'socket.io-client'
import { useRoute } from 'vue-router'
import { useChatStore } from '@/store/chatStore'

export type MesageTye = {
  sender: any
  content: string
  time?: string
  image?: string
}

const newMessage = ref('')
const route = useRoute()
const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id

const socket = io('http://localhost:3000')

const messages = ref<MesageTye[]>([])

const inputValue = ref('')

const lastMessage = ref<HTMLElement | null>(null)
const messageInput = ref<HTMLElement | null>(null)

const scrollToBottom = (smooth = true) => {
  nextTick(() => {
    if (smooth) {
      lastMessage.value?.scrollIntoView({ behavior: 'smooth' })
    } else {
      lastMessage.value?.scrollIntoView({ behavior: 'auto' })
    }
  })
}

const fetchMessages = async () => {
  messages.value = await callApi.get(`/messages/${Number(route.params.id)}`)
}

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    const messagePayload = {
      chatId: Number(route.params.id),
      senderId: currentUserId,
      content: newMessage.value.trim()
    }
    socket.emit('sendMessage', messagePayload)
    newMessage.value = ''
  }
}

socket.on('receiveMessage', (message) => {
  messages.value.push(message)
})

watch(
  messages,
  () => {
    scrollToBottom()
  },
  { deep: true }
)

watch(
  () => Number(route.params.id),
  () => {
    fetchMessages()
    socket.emit('joinChat', Number(route.params.id))
  }
)

onMounted(() => {
  scrollToBottom(false)
  socket.emit('joinChat', Number(route.params.id))
  fetchMessages()
  // socket.emit('join_chat', route.params.id)
})

onUnmounted(() => {
  socket.emit('leaveChat', Number(route.params.id))
})
</script>

<template>
  <el-empty v-if="!Number(route.params.id)" style="height: 100%" description="Tin nhắn của bạn" />
  <div v-else class="flex flex-col bg-white h-[calc(100vh-80px)]">
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <template v-for="(message, index) in messages" :key="index">
        <MessageBox :message="message" />
      </template>
      <div ref="lastMessage"></div>
    </div>
    <div class="bg-white border-t p-4">
      <div class="flex items-center bg-gray-100 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Start typing.."
          class="bg-transparent flex-1 outline-none"
          ref="messageInput"
          v-model="newMessage"
          @keyup.enter="sendMessage"
        />
        <button class="text-blue-500" @click="sendMessage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
