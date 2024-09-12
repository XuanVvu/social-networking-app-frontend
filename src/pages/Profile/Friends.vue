<script lang="ts" setup>
import FriendBox from '@/components/friends/FriendBox.vue'
import { onMounted, ref } from 'vue'
import callApi from '@/services/api'
import { useRoute } from 'vue-router'

const friends = ref()
const route = useRoute()

const getFriends = async () => {
  const friendsData = await callApi.get('/friends', {
    params: {
      status: 'accepted'
    }
  })

  const friendsAccepted = friendsData.map((item: any) => {
    if (item.requester.id == Number(route.params.id)) {
      return item.recipient
    }
    return item.requester
  })
  friends.value = friendsAccepted
  console.log(friends.value)
}

onMounted(async () => {
  getFriends()
})
</script>
<template>
  <div class="" style="min-height: calc(100vh - 395px)">
    <div class="flex gap-2 flex-wrap">
      <div v-for="item of friends">
        <FriendBox :role-friend="0" :data="item" @updateFriends="getFriends" />
      </div>
    </div>
    <!-- <el-empty v-if="friends.length === 0" description="Không có bạn bè" /> -->
  </div>
</template>
