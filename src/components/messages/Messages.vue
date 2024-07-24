<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import MessageBox from './MessageBox.vue';

export type MesageTye = {
    sender: string, text: string, time: string, image?: string
}

const messages = ref<MesageTye[]>([
  { sender: 'Byrom Guittet', text: "I'm fine, how are you 😃", time: '01:35 PM' },
  { sender: 'You', text: "I want those files for you. I want you to send 1 PDF and 1 image file.", time: '01:35 PM' },
  { sender: 'Byrom Guittet', text: "I've found some cool photos for our travel app.", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things going ?", time: '01:35 PM' },
  { 
    sender: 'Byrom Guittet', 
    text: '', 
    image: 'path_to_car_image.jpg',
    time: '01:35 PM' 
  },
  { sender: 'You', text: "Hey mate! How are things going ?", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things going ?", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things going ?", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things going ?", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things going ?", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things going ?", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things a ?", time: '01:35 PM' },
  { sender: 'You', text: "Hey mate! How are things a ?", time: '01:35 PM' },


]);

const inputValue = ref('')

const lastMessage = ref<HTMLElement | null>(null);
const messageInput = ref<HTMLElement | null>(null);

const scrollToBottom = (smooth = true) => {
  nextTick(() => {
    if(smooth) {
      lastMessage.value?.scrollIntoView({ behavior: 'smooth' });

    } else {
      lastMessage.value?.scrollIntoView({ behavior: 'auto' });
    }
  });
};

const sendMessage = () => {
  const dataInput = {
    sender: 'You', text: inputValue.value, time: '01:35 PM' 
  } 
  if( inputValue.value) {

    messages.value.push(dataInput)
  }
  inputValue.value = ''
  messageInput.value?.focus()

}

watch(messages, () => {
  scrollToBottom();
}, { deep: true });

onMounted(() => {
  scrollToBottom(false);
});
</script>

<template>
    <div class="flex flex-col bg-white h-[calc(100vh-80px)]">
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <template v-for="(message, index) in messages" :key="index">
          <MessageBox :message="message" />
        </template>
        <div ref="lastMessage"></div>
      </div>
      <div class="bg-white border-t p-4 ">
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input type="text" placeholder="Start typing.." class="bg-transparent flex-1 outline-none" ref="messageInput" v-model="inputValue" @keyup.enter="sendMessage">
          <button class="text-blue-500" @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg> 
          </button>
        </div>
      </div>
    </div>
  </template>