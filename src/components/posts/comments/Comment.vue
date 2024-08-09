<script lang="ts" setup>
import { MoreFilled } from '@element-plus/icons-vue'
import { ref } from 'vue';

const isHover = ref(false)

const setHover = (value: boolean) => {
    isHover.value = value

}
</script>
<template>
    <div class="flex items-start space-x-3" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <el-avatar class="w-[32px] h-[32px] mt-[8px]"> user </el-avatar>
        <div class="w-[350px]">
            <p class="font-semibold text-black">user name</p>
            <p class="pb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident optio sint expedita ducimus porro nostrum id, ab exercitationem dignissimos et.

            </p>

            <div class="flex justify-between">
                <p>comment time</p>
                <el-dropdown class="" trigger="click">
                    <MoreFilled class="w-[15px] cursor-pointer outline-none" @click="setHover(true)" />
                    <template #dropdown>
                        <el-dropdown-menu class="w-[200px] flex items-center">
                            <el-dropdown-item class="w-full">Edit</el-dropdown-item>
                        </el-dropdown-menu>
                        <el-dropdown-menu class="w-[200px] flex items-center">
                            <el-dropdown-item class="w-full text-red-500">Delete</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>

</template>