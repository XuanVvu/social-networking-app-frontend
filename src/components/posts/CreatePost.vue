<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'

const isOpenDialogAddPost = ref<boolean>(false)
const fileList = ref<any[]>([])
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)
const form = reactive({
  description: ''
})

const isCreateMode = ref<boolean>(true)

const handlePictureCardPreview = (file: { url?: string; preview?: string }) => {
  dialogImageUrl.value = file.url || file.preview || ''
  dialogVisible.value = true
}

const handleRemove = (file: any, fileList: any[]) => {
  console.log('File removed:', file, 'Remaining files:', fileList)
}

const handleUpload = (file: any) => {
  const url = URL.createObjectURL(file.raw)
  file.url = url
  fileList.value.push(file)

  return false
}

const openDialog = (data?: { content: string }) => {
  isOpenDialogAddPost.value = true
  if (data) {
    isCreateMode.value = false
    form.description = data.content
  }
}

const closeDialog = () => {
  isOpenDialogAddPost.value = false
}

const handleConfirm = async () => {
  const formData = new FormData()
  formData.append('content', form.description)

  fileList.value.forEach((file) => {
    formData.append('photos', file.raw)
  })

  try {
    // Gửi request POST đến API backend
    const response = await axios.post('http://localhost:3000/api/v1/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // Xử lý khi thành công
    closeDialog()
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error('Error creating post:', error)
  }
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
  >
    <el-form :model="form" class="flex flex-col gap-5">
      <el-input v-model="form.description" autocomplete="off" type="textarea" placeholder="Mô tả" />

      <div>
        <el-upload
          v-model:file-list="fileList"
          :before-upload="handleUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible" width="30%">
          <img width="100%" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Hủy</el-button>
        <el-button type="primary" @click="handleConfirm">Đăng bài</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-textarea__inner {
  height: 150px !important;
}
</style>
