<script lang="ts" setup>
import { MesageTye } from './Messages.vue';

const { message } = defineProps<{message: MesageTye}>()

</script>

<template>
  <div :class="['flex', message.sender === 'Byrom Guittet' ? 'justify-start' : 'justify-end']">
    <div
      :class="[
        'flex items-end space-x-2',
        message.sender === 'Byrom Guittet' ? 'flex-row' : 'flex-row-reverse'
      ]"
    >
      <img
        v-if="message.sender === 'Byrom Guittet'"
        alt="Byrom Guittet"
        class="w-8 h-8 rounded-full"
      />
      <div>
        <p :class="['text-xs text-gray-500 mb-1', message.sender === 'You' ? 'text-end mr-1' : '']">
          {{ message.sender }}
        </p>
        <div
          :class="[
            'rounded-lg p-3 max-w-xs',
            message.sender === 'Byrom Guittet' ? 'bg-gray-200' : 'bg-blue-500 text-white'
          ]"
        >
          <p>{{ message.text }}</p>
          <img v-if="message.image" :src="message.image" alt="Message image" class="mt-2 rounded" />
        </div>
        <p :class="['text-xs text-gray-500 mt-1', message.sender === 'You' ? 'text-end mr-1' : '']">
          {{ message.time }}
        </p>
      </div>
    </div>
  </div>
</template>
