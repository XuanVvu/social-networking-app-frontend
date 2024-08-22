<script setup lang="ts">
import redHeart from '@/assets/red-heart.svg'
import heart from '@/assets/heart.svg'
import shareIcon from '@/assets/share.svg'
import Icon from '@/components/base/Icon.vue'
import commentIcon from '@/assets/comment-icon.svg'
import { MoreFilled } from '@element-plus/icons-vue'
import CreatePost from '@/components/posts/CreatePost.vue'
import PostDetail from '@/components/posts/PostDetail.vue'
import DateTime from '@/components/common/DateTime.vue'
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'
import callApi from '@/services/api'

const { data, listPostLiked } = defineProps<{ data: any; listPostLiked: any }>()
const postData = ref()
const likedCountData = ref(0)
const commentData = ref()
const iconList = ref([
  {
    icon: heart,
    onClick: () => toggleLike(),
    countData: 0,
    text: 'lượt thích'
  },
  {
    icon: commentIcon,
    onClick: () => openCommentPost(),
    countData: 0,
    text: 'bình luận'
  },
  {
    icon: shareIcon,
    countData: 0,
    text: 'lượt chia sẻ'
  }
])

const toggleLike = async () => {
  like.value = !like.value
  iconList.value[0].icon = like.value ? redHeart : heart
  await updateLikeStatusOnServer(like.value)
}

const updateLikeStatusOnServer = async (isLiked: boolean) => {
  try {
    await callApi.post(`/post-like/${data.id}/like`, { liked: isLiked })
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái yêu thích:', error)
  }
  likedCount()
}

const openCommentPost = async () => {
  fetchComment()
  postDetailRef?.value?.openPostDetail(commentData.value)
}

const fetchComment = async () => {
  const comments = await callApi.get(`/comments/post/${data.id}`)
  commentData.value = comments
  iconList.value[1].countData = comments.length
}

const createPostRef = ref()
const postDetailRef = ref()
const like = ref(false)
const { navigationId } = useNavigation()

const currentUser = localStorage.getItem('currentUser')
const emit = defineEmits(['post-deleted'])

const openEditScreen = async () => {
  postData.value = await callApi.get(`/post/${data.id}`)
  createPostRef?.value?.openDialog(postData.value)
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
const isHideSettingsPost = computed(() => {
  return data.user?.id !== JSON.parse(currentUser as any).id
})

const handleClickUser = () => {
  navigationId('Posts', data.user.id)
}

const likedCount = async () => {
  const count = await callApi.get(`/post-like/${data.id}/count`)
  likedCountData.value = count
  iconList.value[0].countData = count
}

onMounted(async () => {
  if (listPostLiked) {
    like.value = listPostLiked.some((item: any) => item.id === data.id)
    iconList.value[0].icon = like.value ? redHeart : heart
  }
  likedCount()
  fetchComment()
  console.log(commentData.value)
})
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
      <el-dropdown class="" trigger="click" :hidden="isHideSettingsPost">
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
      <div class="flex gap-2" v-for="(iconItem, index) in iconList" :key="index">
        <button
          @click="iconItem.onClick"
          class="flex items-center space-x-4 hover:text-gray-900 h-[25px]"
        >
          <Icon :icon="iconItem.icon" />
        </button>
        <p>{{ iconItem.countData + ' ' + iconItem.text }}</p>
      </div>
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
  <PostDetail ref="postDetailRef" :data="data" />
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
