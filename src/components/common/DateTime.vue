<script lang="ts" setup>
import { computed } from 'vue'

const { time, classProps } = defineProps<{ time: Date; classProps?: string }>()

const formattedDate = computed(() => {
  const date = new Date(time)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
})
</script>
<template>
  <p :class="classProps">{{ formattedDate }}</p>
</template>
