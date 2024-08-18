<script setup lang="ts">
import { reactive, ref } from 'vue'
import UploadFile from '@/components/posts/UploadFile.vue'

const isOpenDialogAddPost = ref<boolean>()
const form = reactive({
  description: ''
})

const isCreateMode = ref<boolean>(true)

const openDialog = (data?: any) => {
  isOpenDialogAddPost.value = true
  if (data) {
    isCreateMode.value = false
    form.description = data.content
  }
}

const closeDialog = () => {
  isOpenDialogAddPost.value = false
}

const handleConfirm = () => {
  // Xử lý logic khi confirm
  closeDialog()
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
    :title="`${isCreateMode ? 'Tạo' : 'Sửa'} bài viêt`"
    class="rounded-xl"
  >
    <el-form :model="form" class="flex flex-col gap-5">
      <el-input v-model="form.description" autocomplete="off" type="textarea" placeholder="Mô tả" />
      <UploadFile />
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpenDialogAddPost = false">Hủy</el-button>
        <el-button type="primary" @click="isOpenDialogAddPost = false"> Đăng bài </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.el-textarea__inner {
  height: 150px !important;
}
</style>
