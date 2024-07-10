<script setup lang="ts">
import useNavigation from '@/composables/useNavigation'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
onMounted(() => {
  const token = localStorage.getItem('token')
  const { navigateTo } = useNavigation()
  if (!token) {
    navigateTo('/login')
  }
})
</script>

<template>
  <router-view></router-view>
</template>
