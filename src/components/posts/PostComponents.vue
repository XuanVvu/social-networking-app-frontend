<script setup lang="ts">
import heart from '@/assets/heart.svg'
import shareIcon from '@/assets/share.svg'
import Icon from '@/components/base/Icon.vue'
import commentIcon from '@/assets/comment-icon.svg'
import { MoreFilled } from '@element-plus/icons-vue'
import CreatePost from '@/components/posts/CreatePost.vue'
import PostDetail from '@/components/posts/PostDetail.vue'
import DateTime from '@/components/common/DateTime.vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'

const openCommentPost = () => {
  postDetailRef?.value?.openPostDetail()
}

const { data } = defineProps<{ data: any }>()
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

const createPostRef = ref()
const postDetailRef = ref()
const { navigationId } = useNavigation()

const currentUser = localStorage.getItem('currentUser')
const emit = defineEmits(['post-deleted'])
const openEditScreen = () => {
  createPostRef?.value?.openDialog(data)
}

const deletePost = () => {
  ElMessageBox.confirm('Bạn có chắc chắn muốn xóa bài viết này không?', 'Xóa bài viêt', {
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    type: 'error',
    customClass: 'delete-dialog'
  })
    .then(async () => {
      emit('post-deleted', data.id, data.user.id)
      ElMessage({
        type: 'success',
        message: 'Bài viết đã được xóa thành công.'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại.'
      })
    })
}

const isHideSettingsPost = () => {
  return data.user?.id !== JSON.parse(currentUser as any).id
}

const handleClickUser = () => {
  navigationId('Posts', data.user.id)
}
</script>
<template>
  <div class="border rounded-lg px-8 py-2 shadow-md bg-[#fff]">
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <div class="mr-4 flex items-center cursor-pointer" @click="handleClickUser">
          <img
            class="w-10 h-10 rounded-full mr-4"
            alt="Profile Picture"
            :src="data.user?.avatar"
            v-if="data.user?.avatar"
          />

          <el-avatar v-else :icon="UserFilled"> </el-avatar>
        </div>
        <div>
          <div class="font-bold cursor-pointer" @click="handleClickUser">
            {{ data.user?.firstName + ' ' + data.user?.lastName }}
          </div>
          <div class="text-sm text-gray-500">
            <DateTime :time="data.createdAt" />
          </div>
        </div>
      </div>
      <el-dropdown class="" trigger="click" :hidden="isHideSettingsPost()">
        <MoreFilled class="w-[20px] cursor-pointer outline-none" />
        <template #dropdown>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full" @click="openEditScreen()">Edit</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu class="w-[200px] flex items-center">
            <el-dropdown-item class="w-full text-red-500" @click="deletePost"
              >Delete</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="mb-8">
      <p class="mb-4">{{ data.content }}</p>
      <div v-if="data.photos">
        <el-carousel trigger="click" :autoplay="false" class="w-[680px] h-[680px]">
          <el-carousel-item v-for="item in data.photos" :key="item.id">
            <img
              class="rounded-sm w-full h-full object-cover"
              :src="`http://localhost:3000${item.url}`"
              alt="Post Image"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="flex text-gray-600 gap-6 mb-3">
      <button
        v-for="iconItem in iconList"
        @click="iconItem.onClick"
        class="flex items-center space-x-4 hover:text-gray-900 h-[25px]"
      >
        <Icon :icon="iconItem.icon" />
      </button>
    </div>
    <div class="border-t flex">
      <input placeholder="Bình luận bài viết" class="w-full px-3 py-4" />
      <button class="text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  </div>
  <CreatePost ref="createPostRef" />
  <PostDetail ref="postDetailRef" />
</template>

<style>
.el-carousel__container {
  height: 680px !important;
}

.delete-dialog .el-message-box__btns .el-button--primary {
  background-color: #f56c6c;
  border: #f56c6c;
}
</style>
