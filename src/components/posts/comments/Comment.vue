<script lang="ts" setup>
import { MoreFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import DateTime from '@/components/common/DateTime.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import useNavigation from '@/composables/useNavigation'

const isHover = ref(false)
const { navigationId } = useNavigation()

const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id

const { data } = defineProps<{ data: any }>()
const emit = defineEmits(['deleteCommentFromChild', 'updateCommentFromChild'])

const deleteComment = () => {
  ElMessageBox.confirm('Bạn có muốn xoá bình luận không?”.', 'Xóa bình luận', {
    confirmButtonText: 'Có',
    cancelButtonText: 'Hủy',
    type: 'error',
    customClass: 'delete-dialog'
  })
    .then(async () => {
      emit('deleteCommentFromChild')
      ElMessage({
        type: 'success',
        message: 'Bình luận đã được xóa thành công.'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại.'
      })
    })
}
const gotoProfile = (id: number) => {
  navigationId('Posts', id)
}

const updateComment = () => {
  emit('updateCommentFromChild', data.id)
}

const setHover = (value: boolean) => {
  isHover.value = value
}
</script>
<template>
  <div
    class="flex items-start space-x-3"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="cursor-pointer" @click="gotoProfile(data.author.id)">
      <img
        v-if="data.author?.avatar"
        :src="`http://localhost:3000/uploads/avatars/${data.author?.avatar}`"
        class="w-[32px] h-[32px] rounded-full object-cover"
      />
      <el-avatar v-else :icon="UserFilled" class="w-[32px] h-[32px]"></el-avatar>
    </div>
    <div class="flex-1">
      <p class="font-semibold text-black cursor-pointer" @click="gotoProfile(data.author.id)">
        {{ data.author.firstName + ' ' + data.author.lastName }}
      </p>
      <p class="pb-1 text-sm">
        {{ data.content }}
      </p>

      <div class="flex justify-between">
        <div class="text-xs">
          <DateTime :time="data.createdAt" />
        </div>
        <el-dropdown class="" trigger="click" :hidden="currentUserId !== data.author.id">
          <MoreFilled class="w-[15px] cursor-pointer outline-none" @click="setHover(true)" />
          <template #dropdown>
            <el-dropdown-menu class="w-[200px] flex items-center">
              <el-dropdown-item class="w-full" @click="updateComment">Edit</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu class="w-[200px] flex items-center">
              <el-dropdown-item class="w-full text-red-500" @click="deleteComment"
                >Delete</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
