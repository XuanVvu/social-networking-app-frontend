<script setup lang="ts">
import ProfileImage from '@/components/profile/ProfileImage.vue'
import { useProfileStore } from '@/store/profile'
import { onMounted, ref } from 'vue'
const profileStore = useProfileStore()

const listPhotos = ref<any>([])
const isOpenImageDetail = ref(false)

const clickImage = () => {
  isOpenImageDetail.value = true
}

onMounted(() => {
  listPhotos.value = profileStore.getPhotos
  console.log(listPhotos.value)
})
</script>
<template>
  <ProfileImage :data="listPhotos" @click="clickImage" />
</template>
