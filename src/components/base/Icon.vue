<script setup lang="ts">
const { icon } = defineProps<{ icon: string }>()
</script>
<template>
  <img :src="icon" alt="" class="h-full" />
</template>
