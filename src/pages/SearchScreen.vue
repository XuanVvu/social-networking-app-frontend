<script lang="ts" setup>
import PostComponents from '@/components/posts/PostComponents.vue'
</script>
<template>

    <div class="pt-8 ps-10 text-[40px] font-semibold">Tìm kiếm</div>
    <div style="height: calc(100vh - 76px);" class="flex flex-col items-center mt-[50px]">
        <div class="border-b w-full flex justify-center">
            <div class=" w-[1000px] flex flex-col gap-3 pb-8">
                <div class="flex gap-3 items-center px-4 py-3 border bg-white cursor-pointer hover:bg-slate-50">
                    <el-avatar></el-avatar>
                    <div>user name</div>

                </div>
                <div class="flex gap-3 items-center px-4 py-3 border bg-white cursor-pointer hover:bg-slate-50">
                    <el-avatar></el-avatar>
                    <div>user name</div>

                </div>
                <div class="flex gap-3 items-center px-4 py-3 border bg-white cursor-pointer hover:bg-slate-50">
                    <el-avatar></el-avatar>
                    <div>user name</div>

                </div>

            </div>

        </div>
        <div class="w-fit">
            <div class="my-5">
                <PostComponents />
            </div>
            <div class="my-5">
                <PostComponents />
            </div>
            <div class="my-5">
                <PostComponents />
            </div>
            <div class="my-5">
                <PostComponents />
            </div>
        </div>
    </div>
</template>