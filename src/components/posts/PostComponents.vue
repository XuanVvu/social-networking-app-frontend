<script setup lang="ts">
import heart from '@/assets/heart.svg'
import shareIcon from '@/assets/share.svg'
import Icon from '@/components/base/Icon.vue'
import commentIcon from '@/assets/comment-icon.svg'

const iconList = [
  {
    icon: heart
  },
  {
    icon: commentIcon
  },
  {
    icon: shareIcon
  }
]

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
</script>
<template>
  <div class="border rounded-lg px-8 py-4 shadow-md bg-[#fff]">
    <div class="flex items-center mb-4">
      <img class="w-10 h-10 rounded-full mr-4" alt="Profile Picture" />
      <div>
        <div class="font-bold">{{ 'userName' }}</div>
        <div class="text-sm text-gray-500">{{ 'postTime' }}</div>
      </div>
    </div>
    <div class="mb-8">
      <p class="mb-4">{{ 'postText' }}</p>
      <div>

        <el-carousel trigger="click" :autoplay="false" class="w-[680px] h-[680px]">
          <el-carousel-item v-for="item in listPostImage" :key="item.id">
            <img class="rounded-sm w-full h-full object-cover" :src="item.url" alt="Post Image" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="flex text-gray-600 gap-6">
      <button v-for="iconItem in iconList" class="flex items-center space-x-4 hover:text-gray-900 h-[25px]">
        <Icon :icon="iconItem.icon" />
      </button>
    </div>
  </div>
</template>

<style>
.el-carousel__container {
  height: 680px !important;
}
</style>