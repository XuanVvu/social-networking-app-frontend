<script lang="ts" setup>
import FriendList from '@/components/friends/FriendList.vue'

import { ref } from 'vue'

const value = ref('Option3')

const options = [
    {
        value: 'Option3',
        label: 'Bạn bè',
    },
    {
        value: 'Option1',
        label: 'Gợi ý kết bạn',
    },
    {
        value: 'Option2',
        label: 'Lời mời kết bạn',
    },

]
</script>

<template>
    <div class="p-[60px] h-[100vh]">
        <div class="bg-white px-6 py-12 border mb-4 flex items-center justify-between">
            <h1 class="font-bold text-2xl">Bạn bè</h1>
            <el-select v-model="value" class="m-2 w-[200px]" placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>

        <FriendList />
    </div>
</template>
