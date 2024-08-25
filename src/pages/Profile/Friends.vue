<script lang="ts" setup>
import FriendBox from '@/components/friends/FriendBox.vue'
import { onMounted } from 'vue'
</script>
<template>
  <div class="w[1000px]">
    <div class="flex gap-2 flex-wrap">
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
      <FriendBox :role-friend="0" />
    </div>
    <!-- <el-empty description="Không có dữ liệu" /> -->
  </div>
</template>
