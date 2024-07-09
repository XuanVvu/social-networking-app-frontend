<script setup lang="ts">
const { classFromParent } = defineProps<{ classFromParent?: string }>()
</script>

<template>
  <el-button type="primary" :class="classFromParent" size="large"><slot /></el-button>
</template>
