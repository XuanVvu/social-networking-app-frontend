<script lang="ts" setup>
import FriendBox from '@/components/friends/FriendBox.vue';
const { itemPerLine } = defineProps<{ itemPerLine?: string }>()

</script>
<template>
    <div :class="`grid gap-4 ${itemPerLine ? itemPerLine : 'grid-cols-6'}`">
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