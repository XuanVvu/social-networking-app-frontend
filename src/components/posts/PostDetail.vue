<script lang="ts" setup>
import { ref } from 'vue';
import { Close } from '@element-plus/icons-vue'
import Comment from "@/components/posts/comments/Comment.vue"

const listPostImage = [
    {
        id: 1,
        url: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg'
    },
    {
        id: 2,
        url: 'https://img.freepik.com/free-vector/work-team-checking-giant-check-list-background_23-2148084919.jpg?w=826&t=st=1723005252~exp=1723005852~hmac=21f5e72badf9c4ee327e31231d4b21507933b6624a2089898d9cdaed65b5f296'
    },
    {
        id: 3,
        url: 'https://mayvers.com.au/wp-content/uploads/2017/09/test-image.jpg'
    },
    {
        id: 4,
        url: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg'
    },

]

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
                <el-carousel trigger="click" :autoplay="false" class="w-full h-full post-detail-img">
                    <el-carousel-item v-for="item in listPostImage" :key="item.id">
                        <img class="object-contain p-2 w-full h-full" :src="item.url" alt="Post Image" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="w-[30%] p-3">
                <div class="border-b pb-3">
                    <div class="flex justify-between pb-3">
                        <div class="flex items-center gap-3">
                            <el-avatar> user </el-avatar>
                            <div>
                                <div class="font-semibold text-black text-base">user name</div>
                                <p class="text-xs">post time</p>
                            </div>
                        </div>
                        <Close class="w-8 cursor-pointer" @click="isOpenPostDetail = false" />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident optio sint expedita ducimus
                        porro nostrum id, ab exercitationem dignissimos et.</p>
                </div>

                <el-scrollbar style="height: calc(100% - 170px);">
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
                <div class="border-t flex">
                    <input placeholder="Bình luận bài viết" class="w-full px-3 py-4" />
                    <button class="text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
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

.post-detail-img .el-carousel__container {
    height: 100% !important;
}
</style>