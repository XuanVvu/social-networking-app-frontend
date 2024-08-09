<script lang="ts" setup>
import { ref } from 'vue';
import { Close } from '@element-plus/icons-vue'
import Comment from "@/components/posts/comments/Comment.vue"

const isOpenPostDetail = ref()

const openPostDetail = () => {
    isOpenPostDetail.value = true
}

defineExpose({
    openPostDetail
})


</script>
<template>
    <el-dialog v-model="isOpenPostDetail" class="h-[90vh] w-[1500px] p-0" align-center>

        <div class="flex h-full">
            <div class="flex items-center bg-black w-[70%]">
                <img src="https://i.pinimg.com/564x/db/85/99/db85998510e152f6d02214da2b70ab60.jpg"
                    class="object-contain p-2 w-full h-full" alt="">
            </div>
            <div class="w-[30%] p-3">
                <div class="border-b pb-3">
                    <div class="flex justify-between pb-3">
                        <div class="flex items-center gap-2">
                            <el-avatar> user </el-avatar>
                            <div class="font-semibold text-black">user name</div>
                        </div>
                        <Close class="w-8 cursor-pointer" @click="isOpenPostDetail = false" />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident optio sint expedita ducimus
                        porro nostrum id, ab exercitationem dignissimos et.</p>
                </div>

                <el-scrollbar style="height: calc(100% - 128px);">
                    <div class="flex flex-col gap-6 py-3 px-5">
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                </el-scrollbar>
            </div>

        </div>
    </el-dialog>

</template>

<style>
.el-dialog__header.show-close {
    display: none;
}

.el-dialog__body {
    height: 100%;
}
</style>