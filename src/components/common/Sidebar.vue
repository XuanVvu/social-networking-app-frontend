<script setup lang="ts">
import useNavigation from '@/composables/useNavigation';
import { HomeFilled, UserFilled, StarFilled, Promotion, Setting } from '@element-plus/icons-vue'
import CreatePost from "@/components/posts/CreatePost.vue"
import { ref } from 'vue';
const feeds = [
  { name: 'Newsfeed', iconClass: 'bg-blue-600 text-white p-2 rounded-full', component: HomeFilled, idScreen: 'new-feed' },
  { name: 'Bạn bè', iconClass: 'bg-red-600 text-white p-2 rounded-full', component: UserFilled, idScreen: 'friends' },
  {
    name: 'Explore Stories',
    iconClass: 'bg-yellow-500 text-white p-2 rounded-full',
    component: StarFilled,
    idScreen: 'new-feed1'
  },
  {
    name: 'Chat GPT',
    iconClass: 'bg-red-400 text-white p-2 rounded-full',
    component: Promotion,
    idScreen: 'new-feed1'
  },
  {
    name: 'Tạo',
    iconClass: 'bg-red-400 text-white p-2 rounded-full',
    component: Promotion,
    idScreen: 'create-post'
  },
  {
    name: 'Trang cá nhân',
    iconClass: 'rounded-full',
    idScreen: 'profile'
  }
]

const createPostRef = ref<InstanceType<typeof CreatePost> | null>(null);

const { navigateTo } = useNavigation()

const handleClickSidebarItem = (item: any) => {
  switch (item.idScreen) {
    case 'profile':
      navigateTo('/profile')
      break;
    case 'create-post':
      createPostRef?.value?.openDialog()
      break;
    case 'friends':
      navigateTo('/friends')
      break;

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
        <Setting class="w-8 mr-2" />
        <span class="font-semibold">Setting</span>
      </button>
    </div>
  </div>

  <CreatePost ref="createPostRef" />

</template>
