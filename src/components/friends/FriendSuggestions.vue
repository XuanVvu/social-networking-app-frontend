<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Right, UserFilled } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'

const { navigationWithQuery, navigationId } = useNavigation()
const { nonFriendsData } = defineProps<{ nonFriendsData: any }>()
const nonFriends = ref<any[]>()
const gotoFriendPage = () => {
  navigationWithQuery('/friends', 'status', 'non-friend')
}

const gotoProfileUser = (id: number) => {
  navigationId('Posts', id)
}
onMounted(async () => {
  if (nonFriendsData) {
    nonFriends.value = nonFriendsData
  }
})
</script>

<template>
  <div class="border font-sans bg-white rounded-lg p-4 shadow-md my-5 flex-1 h-[300px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Lời mời kết bạn</h2>
      <a href="#" class="text-blue-600 text-sm" @click="gotoFriendPage">See all</a>
    </div>
    <div
      v-for="friend in Array.isArray(nonFriendsData) ? nonFriendsData.slice(0, 3) : []"
      :key="friend.id"
      class="bg-gray-100 rounded-lg p-3 mb-2 flex items-center cursor-pointer hover:bg-gray-200"
      @click="gotoProfileUser(friend.id)"
    >
      <div class="mr-3">
        <img
          v-if="friend?.avatar"
          :src="`http://localhost:3001/uploads/avatars/${friend?.avatar}`"
          :alt="friend.name"
          class="w-10 h-10 rounded-full"
        />
        <el-avatar v-else :icon="UserFilled"></el-avatar>
      </div>
      <div class="flex-grow">
        <h3 class="text-sm font-semibold">{{ friend.lastName + ' ' + friend.firstName }}</h3>
      </div>
      <button class="w-5">
        <Right />
      </button>
    </div>
  </div>
</template>
