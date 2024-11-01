<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import ErrorDialog from './components/common/ErrorDialog.vue';
onMounted(() => {
  // const token = localStorage.getItem('token')
  // const { navigateTo } = useNavigation()
  // if (!token) {
  //   navigateTo('/login')
  // }
})
</script>

<template>
  <router-view></router-view>
  <error-dialog />
</template>
