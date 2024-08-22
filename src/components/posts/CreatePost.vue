<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import callApi from '@/services/api'
import useNavigation from '@/composables/useNavigation'
import { useProfileStore } from '@/store/profile'

const isOpenDialogAddPost = ref<boolean>(false)
const fileList = ref<any[]>([])
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)
const form = reactive({
  id: 0,
  description: ''
})

const { navigationId } = useNavigation()

const currentUser = localStorage.getItem('currentUser')
const currentUserId = JSON.parse(currentUser as any).id
const profileStore = useProfileStore()

const isCreateMode = ref<boolean>(true)

const handlePictureCardPreview = (file: { url?: string; preview?: string }) => {
  dialogImageUrl.value = file.url || file.preview || ''
  dialogVisible.value = true
}

const handleRemove = (file: any, fileList: any[]) => {}

const openDialog = (data?: { id: number; content: string; photos: any[] }) => {
  isOpenDialogAddPost.value = true
  if (data) {
    isCreateMode.value = false
    form.description = data.content
    form.id = data.id

    const listPhotos = data.photos.map((item) => {
      return {
        id: item.id,
        url: `http://localhost:3000${item.url}`
      }
    })

    fileList.value = listPhotos
  }
}

const closeDialog = () => {
  isOpenDialogAddPost.value = false
  fileList.value = []
  form.description = ''
}

const handleConfirm = async (isCreateMode: boolean) => {
  const formData = new FormData()
  formData.append('content', form.description)
  fileList.value.forEach((file) => {
    formData.append('photos', file.raw)
  })

  if (isCreateMode) {
    await callApi.post('/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } else {
    await callApi.put(`/post/update/${form.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  closeDialog()
  profileStore.fetchPosts(Number(currentUserId))
  navigationId('Posts', Number(currentUserId))
}

const handleChangeFile = (file: any, fileListUpload: any) => {
  fileList.value = fileListUpload
}

defineExpose({
  isOpenDialogAddPost,
  openDialog,
  closeDialog,
  handleConfirm
})
</script>

<template>
  <el-dialog
    v-model="isOpenDialogAddPost"
    :title="`${isCreateMode ? 'Tạo' : 'Sửa'} bài viết`"
    class="rounded-xl"
    align-center
  >
    <el-form :model="form" class="flex flex-col gap-5">
      <el-input v-model="form.description" autocomplete="off" type="textarea" placeholder="Mô tả" />

      <div>
        <el-upload
          v-model:file-list="fileList"
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChangeFile"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <!-- <UploadFile /> -->
      <!-- <input type="file" @change="handleChangeFile" /> -->
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Hủy</el-button>

        <el-button v-if="isCreateMode" type="primary" @click="handleConfirm(true)"
          >Đăng bài</el-button
        >
        <el-button v-else="!isCreateMode" type="primary" @click="handleConfirm(false)"
          >Cập nhật</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-textarea__inner {
  height: 150px !important;
}
</style>
