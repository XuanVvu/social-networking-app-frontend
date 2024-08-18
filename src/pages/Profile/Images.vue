<script setup lang="ts">
import ProfileImage from '@/components/profile/ProfileImage.vue'
import { useProfileStore } from '@/store/profile'
import { onMounted, ref } from 'vue'
const profileStore = useProfileStore()

const listPhotos = ref<any>([])

onMounted(() => {
  listPhotos.value = profileStore.getPhotos
})
</script>
<template>
  <ProfileImage :data="listPhotos" />
</template>
