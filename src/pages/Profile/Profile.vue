<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { TabsPaneContext } from 'element-plus/es/components/tabs/src/constants'
import { useRoute, useRouter } from 'vue-router'
import useNavigation from '@/composables/useNavigation'
import { useProfileStore } from '@/store/profile'
import { UserFilled } from '@element-plus/icons-vue'
import callApi from '@/services/api'
import ListPost from '@/pages/Profile/ListPost.vue'
import Images from '@/pages/Profile/Images.vue'
import Friends from '@/pages/Profile/Friends.vue'

const route = useRoute()
const router = useRouter()
const { navigationId } = useNavigation()
const activeName = ref('')
const friendStatusData = ref()

const profileStore = useProfileStore()
const isDataReady = ref(false)
const currentUser = localStorage.getItem('currentUser')
const currentUserData = JSON.parse(currentUser as any)
const user = ref()

const handleClick = async (tab: TabsPaneContext) => {
  switch (tab.props.name) {
    case 'first':
      navigationId('Posts', Number(route.params.id))
      break
    case 'second':
      activeName.value = 'second'
      navigationId('Images', Number(route.params.id))
      break
    case 'third':
      activeName.value = 'third'
      navigationId('ProfileFriends', Number(route.params.id))
      break
    default:
      break
  }
}

const updateActiveTab = () => {
  switch (route.name) {
    case 'Posts':
      activeName.value = 'first'
      break
    case 'Images':
      activeName.value = 'second'
      break
    case 'ProfileFriends':
      activeName.value = 'third'
      break
  }
}

const addFriend = async () => {
  await callApi.post(`/friends/request/${Number(route.params.id)}`, {})
  getFriendsStatus()
}

const acceptFriend = async () => {
  await callApi.post(`/friends/accept/${Number(route.params.id)}`, {})
  getFriendsStatus()
}

const removeFriend = async () => {
  await callApi.delete(`/friends/${Number(route.params.id)}`, {})
  getFriendsStatus()
}

const cancelFriendRequest = async () => {
  await callApi.delete(`/friends/cancel/${Number(route.params.id)}`, {})
  getFriendsStatus()
}

const handleChat = async () => {
  const currentUserId = currentUserData.id
  const chat = await callApi.post('/chats', {
    userId1: currentUserId,
    userId2: Number(route.params.id)
  })
  if (chat) {
    router.push(`/inbox/${chat.data.id}`)
  }
}

watch(() => route.name, updateActiveTab, { immediate: true })

const getFriendsStatus = async () => {
  const friendStatus = await callApi.get(`/friends/status/${Number(route.params.id)}`)
  friendStatusData.value = friendStatus.status
}

onMounted(async () => {
  await profileStore.fetchPosts(Number(route.params.id))
  user.value = await callApi.get(`/users/${route.params.id}`)
  getFriendsStatus()
  isDataReady.value = true
})
</script>
<template>
  <div class="flex bg-white justify-center gap-[100px] py-[30px]">
    <div class="" v-if="user?.avatar">
      <img :src="`http://localhost:3001/uploads/avatars/${user.avatar}`"
        class="object-cover w-[200px] h-[200px] rounded-full" alt="" />
    </div>
    <el-avatar v-else :icon="UserFilled" class="w-[200px] h-[200px]"></el-avatar>

    <div class="w-[30%]">
      <div class="flex justify-between pb-5">
        <h3 class="font-bold text-xl">{{ user?.firstName }} {{ user?.lastName }}</h3>
        <span class="text-lg">{{ profileStore.getPosts?.length }} bài viết </span>
      </div>
      <div class="flex items-center gap-5 mb-5">
        <div class="font-bold text-xl">Giới tính</div>
        <div class="">
          <span>{{ user?.gender === 1 ? 'Nam' : 'Nữ' }}</span>
        </div>
      </div>

      <div class="font-bold text-xl">Về tôi</div>
      <div class="mb-5">
        <span v-if="user?.description">{{ user?.description }}</span>
        <i v-else>Chưa cập nhật mô tả</i>
      </div>
      <div class="flex gap-5 text-white" v-if="Number(route.params.id) !== currentUserData.id">
        <div>
          <button class="bg-blue-600 px-5 py-2 rounded-2xl hover:opacity-90" v-if="friendStatusData === 'not_friends'"
            @click="addFriend">
            Kết bạn
          </button>
          <button class="bg-slate-600 px-5 py-2 rounded-2xl hover:opacity-90"
            v-if="friendStatusData === 'pending_request'" @click="acceptFriend">
            Chấp nhận
          </button>
          <button class="bg-red-600 px-5 py-2 rounded-2xl hover:opacity-90" v-if="friendStatusData === 'friends'"
            @click="removeFriend">
            Gỡ kết bạn
          </button>

          <button class="bg-red-600 px-5 py-2 rounded-2xl hover:opacity-90" v-if="friendStatusData === 'sent_request'"
            @click="cancelFriendRequest">
            Huỷ lời mời
          </button>
        </div>
        <button class="bg-blue-600 px-5 py-2 rounded-2xl hover:opacity-90" @click="handleChat">
          Nhắn tin
        </button>
      </div>
    </div>
  </div>
  <el-tabs v-model="activeName" @tab-click="handleClick" v-if="isDataReady">
    <el-tab-pane label="Bài viết" name="first" :lazy="true">
      <list-post />
    </el-tab-pane>
    <el-tab-pane label="Ảnh" name="second" :lazy="true">
      <images />
    </el-tab-pane>
    <el-tab-pane label="Bạn bè" name="third" :lazy="true" v-if="Number(route.params.id) === currentUserData.id">
      <div class="w-[1000px]">
        <friends />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
.el-tabs {
  display: block;
}

.el-tabs__active-bar {
  top: 0;
}

.el-tabs__nav-wrap::after {
  display: none !important;
}

.el-tabs__nav-wrap::before {
  display: block;
  background-color: var(--el-border-color-light);
  top: 0;
  content: '';
  height: 2px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: var(--el-index-normal);
}

.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}

.el-tabs__content {
  display: flex;
  justify-content: center;
}

.el-tabs__item {
  padding-top: 18px;
  font-size: 16px;
}

.el-avatar svg {
  width: 100%;
  height: 100%;
}

.el-avatar .el-icon {
  width: 100%;
  height: 70%;
}
</style>
