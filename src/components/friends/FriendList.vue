<script lang="ts" setup>
import FriendBox from '@/components/friends/FriendBox.vue';

const { itemPerLine } = defineProps<{ itemPerLine?: number }>()

</script>
<template>
    <div :class="`grid grid-cols-${itemPerLine ? itemPerLine : 6} gap-4 flex-1`">
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