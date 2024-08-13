<script lang="ts" setup>
import FriendBox from '@/components/friends/FriendBox.vue';
const { itemPerLine } = defineProps<{ itemPerLine?: string }>()

</script>
<template>
    <div class="flex gap-2 flex-wrap">
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
        <FriendBox :role-friend=0 />
    </div>
</template>