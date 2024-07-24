<script lang="ts" setup>
import { ref } from 'vue';
import SidebarItem from '@/components/messages/SidebarItem.vue'

export type Contact = {
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
}

const contacts = ref<Contact[]>([
  { name: 'Test1', avatar: 'path_to_avatar.jpg', lastMessage: 'Quá chất đấy trời', time: '1 tuần' },
  { name: 'Test2', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 2 giờ trước', time: '2 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
  { name: 'Test3', avatar: 'path_to_avatar.jpg', lastMessage: 'Hoạt động 1 giờ trước', time: '1 giờ trước' },
]);
</script>
<template>
    <div class="w-80 bg-white border-r border-gray-200">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold flex items-center justify-between">
          xuanvu03_07
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </h2>
      </div>
  
      <div class="overflow-y-auto h-[calc(100vh-141px)]" >
        <template v-for="(contact, index) in contacts" :key="index">
            <SidebarItem :contact="contact"/>
        </template>
      </div>
    </div>
  </template>