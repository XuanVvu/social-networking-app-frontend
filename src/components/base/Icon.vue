<script setup lang="ts">
const { icon } = defineProps<{ icon: string }>()
</script>
<template>
  <img :src="icon" alt="" class="h-[20px]" />
</template>
