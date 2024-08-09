<script setup lang="ts">
import heart from '@/assets/heart.svg'
import shareIcon from '@/assets/share.svg'
import Icon from '@/components/base/Icon.vue'
import commentIcon from '@/assets/comment-icon.svg'
import { MoreFilled } from '@element-plus/icons-vue'
import CreatePost from "@/components/posts/CreatePost.vue"
import PostDetail from '@/components/posts/PostDetail.vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'


const openCommentPost = () => {
  postDetailRef?.value?.openPostDetail()

}

const iconList = [
  {
    icon: heart
  },
  {
    icon: commentIcon,
    onClick: openCommentPost
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

const dialogValue = ref<boolean>(false)
const createPostRef = ref()
const postDetailRef = ref()

const openEditScreen = () => {
  createPostRef?.value?.openDialog()
}

const deletePost = () => {
  dialogValue.value = true

  ElMessageBox.confirm(
    'Bạn có chắc chắn muốn xóa bài viết này không?',
    'Xóa bài viêt',
    {
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      type: 'error',
      dangerouslyUseHTMLString: true,
      customClass: 'delete-dialog'
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Bài viết đã được xóa thành công.',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại.',
      })
    })

}
</script>
<template>
  <div class="border rounded-lg px-8 py-4 shadow-md bg-[#fff]">
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <img class="w-10 h-10 rounded-full mr-4" alt="Profile Picture" />
        <div>
          <div class="font-bold">{{ 'userName' }}</div>
          <div class="text-sm text-gray-500">{{ 'postTime' }}</div>
        </div>

      </div>
      <el-dropdown class="" trigger="click">
        <MoreFilled class="w-[20px] cursor-pointer outline-none" />
        <template #dropdown>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full" @click="openEditScreen">Edit</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full text-red-500" @click="deletePost">Delete</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
      <button v-for="iconItem in iconList" class="flex items-center space-x-4 hover:text-gray-900 h-[25px]"
        @click="iconItem.onClick">
        <Icon :icon="iconItem.icon" />
      </button>
    </div>
  </div>

  <!-- <DialogConfirm v-model="dialogValue" /> -->
  <CreatePost ref="createPostRef" />
  <PostDetail ref="postDetailRef" />
</template>

<style>
.el-carousel__container {
  height: 680px !important;
}

.delete-dialog .el-message-box__btns .el-button--primary {
  background-color: #F56C6C;
  border: #F56C6C;
}
</style>
