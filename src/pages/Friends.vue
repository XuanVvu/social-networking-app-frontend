<script lang="ts" setup>
import FriendBox from '@/components/friends/FriendBox.vue'
import callApi from '@/services/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const value = ref('Option3')
const friends = ref()
const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id
const route = useRoute()

const options = ref([
  {
    value: 'Option3',
    label: 'Bạn bè',
    onClick: () => getFriendsOrRequest(true)
  },
  {
    value: 'Option1',
    label: 'Gợi ý kết bạn',
    onClick: () => getNonFriends()
  },
  {
    value: 'Option2',
    label: 'Lời mời kết bạn',
    onClick: () => getFriendsOrRequest(false)
  }
])

const getFriendsOrRequest = async (flag: boolean) => {
  const friendsData = await callApi.get('/friends', {
    params: {
      status: flag ? 'accepted' : 'pending'
    }
  })
  if (!flag) {
    const friendsRequest = friendsData.map((item: any) => {
      return item.requester
    })
    friends.value = friendsRequest
  } else {
    const friendsAccepted = friendsData.map((item: any) => {
      if (item.requester.id == currentUserId) {
        return item.recipient
      }
      return item.requester
    })
    friends.value = friendsAccepted
  }
}
const getNonFriends = async () => {
  friends.value = await callApi.get('/friends/non-friends')
}

onMounted(async () => {
  if (route.query.status === 'non-friend') {
    getNonFriends()
    value.value = 'Option1'
    return
  }
  getFriendsOrRequest(true)
})
</script>

<template>
  <div class="p-[60px]" style="height: calc(100vh - 80px)">
    <div class="bg-white px-6 py-12 border mb-4 flex items-center justify-between">
      <h1 class="font-bold text-2xl">Bạn bè</h1>
      <el-select v-model="value" class="m-2 w-[200px]" placeholder="Select" size="large">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click="item.onClick"
        />
      </el-select>
    </div>

    <!-- <FriendList /> -->
    <div class="flex gap-2 flex-wrap" v-if="friends?.length > 0">
      <div v-for="item of friends" :key="item.id">
        <FriendBox
          :data="item"
          @updateFriends="getFriendsOrRequest(true)"
          @updateFriendsRequest="getFriendsOrRequest(false)"
          @updateNonFriends="getNonFriends"
        />
      </div>
    </div>
    <el-empty v-else style="height: calc(100vh - 0)" description="Không có dữ liệu" />
  </div>
</template>
