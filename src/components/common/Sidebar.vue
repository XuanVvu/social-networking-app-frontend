<script setup lang="ts">
import useNavigation from '@/composables/useNavigation';
import { HomeFilled, UserFilled, StarFilled, Promotion, Setting, Comment, BellFilled, Plus } from '@element-plus/icons-vue'
import CreatePost from "@/components/posts/CreatePost.vue"
import ListNotifications from "@/components/notifications/ListNotifications.vue"
import { ref } from 'vue';
const feeds = [
  { name: 'Bảng tin', iconClass: 'bg-blue-600 text-white p-2 rounded-full', component: HomeFilled, idScreen: 'new-feed' },
  {
    name: 'Tạo',
    iconClass: 'bg-red-600 text-white p-2 rounded-full',
    component: Plus,
    idScreen: 'create-post'
  },
  { name: 'Bạn bè', iconClass: 'bg-green-600 text-white p-2 rounded-full', component: UserFilled, idScreen: 'friends' },
  {
    name: 'Tin nhắn',
    iconClass: 'bg-yellow-500 text-white p-2 rounded-full',
    component: Comment,
    idScreen: 'chat'
  },
  {
    name: 'Thông báo',
    iconClass: 'bg-gray-600 text-white p-2 rounded-full',
    component: BellFilled,
    idScreen: 'notification'
  },
  {
    name: 'Chat GPT',
    iconClass: 'bg-red-400 text-white p-2 rounded-full',
    component: Promotion,
    idScreen: 'new-feed1'
  },
  {
    name: 'Trang cá nhân',
    iconClass: 'rounded-full',
    idScreen: 'profile'
  }
]

const createPostRef = ref<InstanceType<typeof CreatePost> | null>(null);
const notificationRef = ref<InstanceType<typeof ListNotifications> | null>(null)

const { navigateTo } = useNavigation()

const handleClickSidebarItem = (item: any) => {
  switch (item.idScreen) {
    case 'new-feed':
      navigateTo('/')
      break;
    case 'profile':
      navigateTo('/profile/posts')
      break;
    case 'create-post':
      createPostRef?.value?.openDialog()
      break;
    case 'friends':
      navigateTo('/friends')
      break;
    case 'chat':
      navigateTo('/inbox')
      break;

    case 'notification':
      notificationRef.value?.openDrawer()
  }


}
</script>
<template>
  <div class="bg-[#fbfcfe] p-4 w-72 fixed bottom-0 top-[77px] flex flex-col border-r border-gray-200">
    <p class="text-gray-60 font-bold mb-4 text-[14px]">New Feeds</p>

    <div v-for="item in feeds" :key="item.name"
      class="px-4 py-2 flex items-center space-x-4 hover:bg-slate-100 hover:cursor-pointer rounded-md"
      @click="handleClickSidebarItem(item)">
      <div :class="item.iconClass">
        <div v-if="item.component">
          <component :is="item.component" class="w-[20px]"></component>
        </div>
        <div v-else>
          <img class="rounded-full w-9 h-9" src="https://cdn.kwork.com/pics/t3/23/23861753-1669731023.jpg" alt="" />
        </div>
      </div>
      <span class="">{{ item.name }}</span>
    </div>

    <div class="mt-auto py-3">
      <button class="flex items-center w-full hover:text-gray-500 px-2">

      </button>
    </div>
  </div>

  <CreatePost ref="createPostRef" />

  <ListNotifications ref="notificationRef" />

</template>
