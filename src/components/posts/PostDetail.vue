<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import Comment from '@/components/posts/comments/Comment.vue'
import DateTime from '@/components/common/DateTime.vue'
import callApi from '@/services/api'
import { UserFilled } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'

const isOpenPostDetail = ref()
const listComments = ref()
const isCreateComment = ref(true)
const updateId = ref()
const { data } = defineProps<{ data: any }>()
const commentContent = reactive({
  content: ''
})

const emit = defineEmits(['fetchCommentsData'])
const { navigationId } = useNavigation()

const openPostDetail = (comments: any) => {
  listComments.value = comments
  isOpenPostDetail.value = true
}

const closePostDetail = () => {
  emit('fetchCommentsData')
  isOpenPostDetail.value = false
}
const deleteComment = async (deleteId: number) => {
  await callApi.delete(`/comments/${deleteId}`)
  const comments = await callApi.get(`/comments/post/${data.id}`)
  listComments.value = comments
}

const onUpdateClicked = (updateCommentId: number) => {
  isCreateComment.value = false
  updateId.value = updateCommentId
  const comment = listComments.value.find((item: any) => item.id === updateCommentId)
  commentContent.content = comment.content
}

const handleCommentPost = async () => {
  if (isCreateComment.value) {
    await callApi.post(`/comments/${data.id}`, commentContent)
  } else {
    await callApi.put(`/comments/${updateId.value}`, commentContent)
  }
  const comments = await callApi.get(`/comments/post/${data.id}`)
  listComments.value = comments
  isCreateComment.value = true
  commentContent.content = ''
}

const gotoProfile = (id: number) => {
  navigationId('Posts', id)
}

defineExpose({
  openPostDetail
})
</script>
<template>
  <el-dialog v-model="isOpenPostDetail" class="h-[90vh] w-[80vw] p-0 post-detail" align-center>
    <div class="flex h-full">
      <div class="flex items-center bg-black w-[70%]">
        <el-carousel trigger="click" :autoplay="false" class="w-full h-full post-detail-img">
          <el-carousel-item v-for="item in data.photos" :key="item.id">
            <img
              class="object-contain p-2 w-full h-full"
              :src="`http://localhost:3001${item.url}`"
              alt="Post Image"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="w-[30%] p-3">
        <div class="border-b pb-3">
          <div class="flex justify-between pb-3">
            <div class="flex items-center gap-3">
              <div class="mr-2 cursor-pointer" @click="gotoProfile(data.user?.id)">
                <img
                  v-if="data.user?.avatar"
                  :src="`http://localhost:3001/uploads/avatars/${data.user?.avatar}`"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <el-avatar v-else :icon="UserFilled"></el-avatar>
              </div>
              <div>
                <div
                  class="font-semibold text-black text-base cursor-pointer"
                  @click="gotoProfile(data.user?.id)"
                >
                  {{ data.user?.id + data.user?.firstName + ' ' + data.user?.lastName }}
                </div>
                <div class="text-sm text-gray-500">
                  <DateTime :time="data.createdAt" />
                </div>
              </div>
            </div>
            <Close class="w-8 cursor-pointer" @click="closePostDetail" />
          </div>
          <p>
            {{ data.content }}
          </p>
        </div>

        <el-scrollbar style="height: calc(100% - 135px)">
          <div
            class="flex flex-col gap-6 py-3 px-5"
            v-for="comment of listComments"
            :key="comment.id"
          >
            <Comment
              :data="comment"
              @deleteCommentFromChild="deleteComment(comment.id)"
              @update-comment-from-child="onUpdateClicked"
            />
          </div>
        </el-scrollbar>
        <div class="border-t flex">
          <input
            placeholder="Bình luận bài viết"
            class="w-full px-3 py-4"
            v-model="commentContent.content"
            @keyup.enter="handleCommentPost"
          />
          <button class="text-blue-500" @click="handleCommentPost">
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
    </div>
  </el-dialog>
</template>

<style>
.post-detail .show-close {
  display: none;
}

.el-dialog__body {
  height: 100%;
}

.post-detail-img .el-carousel__container {
  height: 100% !important;
}
</style>
