<script lang="ts" setup>
import ImageBox from './ImageBox.vue'

const { data } = defineProps<{ data: any }>()
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <div v-for="item of data">
      <ImageBox :url="item.url" />
    </div>
  </div>
</template>
