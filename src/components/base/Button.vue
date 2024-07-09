<script setup lang="ts">
const { classFromParent } = defineProps<{ classFromParent?: string }>()
</script>

<template>
  <el-button
    type="primary"
    :class="`${classFromParent} bg-[#343a40] text-white hover:bg-[#41474f] border-none rounded-md`"
    size="large"
    ><slot
  /></el-button>
</template>
