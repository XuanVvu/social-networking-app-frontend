<script lang="ts" setup>
const { url } = defineProps<{ url: string }>()
</script>

<template>
  <div class="">
    <img
      class="w-full rounded-md object-cover h-[300px]"
      :src="`http://localhost:3000${url}`"
      alt="Post Image"
    />
  </div>
</template>
