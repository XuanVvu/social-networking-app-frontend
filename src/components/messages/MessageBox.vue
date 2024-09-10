<script lang="ts" setup>
import { MesageTye } from './Messages.vue'

const { message } = defineProps<{ message: MesageTye }>()
const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id
</script>

<template>
  <div :class="['flex', message.sender?.id !== currentUserId ? 'justify-start' : 'justify-end']">
    <div
      :class="[
        'flex items-end space-x-2',
        message.sender?.id !== currentUserId ? 'flex-row' : 'flex-row-reverse'
      ]"
    >
      <img
        v-if="message.sender.id !== currentUserId"
        alt="Byrom Guittet"
        class="w-8 h-8 rounded-full"
      />
      <div>
        <p :class="['text-xs text-gray-500 mb-1', message.sender === 'You' ? 'text-end mr-1' : '']">
          {{ message.sender?.firstName + ' ' + message.sender?.lastName }}
        </p>
        <div
          :class="[
            'rounded-lg p-3 max-w-xs',
            message.sender.id !== currentUserId ? 'bg-gray-200' : 'bg-blue-500 text-white'
          ]"
        >
          <p>{{ message.content }}</p>
        </div>
        <p :class="['text-xs text-gray-500 mt-1', message.sender === 'You' ? 'text-end mr-1' : '']">
          {{ message.time }}
        </p>
      </div>
    </div>
  </div>
</template>
