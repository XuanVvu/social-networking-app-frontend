<script setup lang="ts">
import { RouterView } from 'vue-router'
import ErrorDialog from "@/components/common/ErrorDialog.vue"
</script>

<template>
  <router-view></router-view>
  <error-dialog />
</template>
