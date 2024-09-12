<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import avt from '@/assets/avt.png'
import callApi from '@/services/api'
import useNavigation from '@/composables/useNavigation'

const { data } = defineProps<{ data: any }>()
const friendStatusData = ref()
const { navigationId } = useNavigation()

const emit = defineEmits(['updateFriends', 'updateFriendsRequest', 'updateNonFriends'])
const addFriend = async () => {
  await callApi.post(`/friends/request/${data.id}`, {})
  getFriendsStatus()
  emit('updateNonFriends')
}

const acceptFriend = async () => {
  await callApi.post(`/friends/accept/${data.id}`, {})
  getFriendsStatus()
  emit('updateFriendsRequest')
}

const removeFriend = async () => {
  await callApi.delete(`/friends/${data.id}`, {})
  getFriendsStatus()
  emit('updateFriends')
}

const getFriendsStatus = async () => {
  const friendStatus = await callApi.get(`/friends/status/${data.id}`)
  friendStatusData.value = friendStatus.status
}

const gotoProfile = () => {
  navigationId('Posts', data.id)
}

onMounted(() => {
  getFriendsStatus()
})
</script>

<template>
  <div
    class="bg-white border p-5 rounded-lg flex flex-col items-center justify-center gap-4 w-[240px]"
  >
    <div
      class="cursor-pointer flex flex-col items-center justify-center gap-4"
      @click="gotoProfile"
    >
      <img
        :src="data?.avatar ? `http://localhost:3000/uploads/avatars/${data.avatar}` : avt"
        alt=""
        class="w-[190px] h-[230px] object-cover"
      />
      <div>{{ data?.firstName + ' ' + data?.lastName }}</div>
    </div>
    <div class="text-white font-semibold">
      <button
        class="bg-blue-600 px-5 py-2 rounded-2xl hover:opacity-80"
        v-if="friendStatusData === 'not_friends'"
        @click="addFriend"
      >
        Kết bạn
      </button>
      <button
        class="bg-slate-600 px-5 py-2 rounded-2xl hover:opacity-80"
        v-if="friendStatusData === 'pending_request'"
        @click="acceptFriend"
      >
        Chấp nhận
      </button>
      <button
        class="bg-red-600 px-5 py-2 rounded-2xl hover:opacity-80"
        v-if="friendStatusData === 'friends'"
        @click="removeFriend"
      >
        Gỡ kết bạn
      </button>
    </div>
  </div>
</template>
