<script lang="ts" setup>
import InputBase from '@/components/base/InputBase.vue'
import { onMounted, reactive, ref } from 'vue'
import callApi from '@/services/api'
import useNavigation from '@/composables/useNavigation'
import { useAuthStore } from '@/store/auth'
import { ElNotification } from 'element-plus'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  genders: '1',
  description: ''
})
const { navigationId } = useNavigation()
const fileList = ref<any[]>([])
const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')
const currentUser = localStorage.getItem('currentUser')
const currentUserData = JSON.parse(currentUser as any)
const currentUserId = JSON.parse(currentUser as any).id
const authStore = useAuthStore()

const handleChangeFile = (file: any, fileListUpload: any) => {
  fileList.value = fileListUpload
}

const submitUpdate = async () => {
  const formData = new FormData()
  formData.append('firstName', form.firstName ? form.firstName : currentUserData.firstName)
  formData.append('lastName', form.lastName ? form.lastName : currentUserData.lastName)
  formData.append('genders', form.genders ? form.genders : currentUserData.gender)
  formData.append('description', form.description ? form.description : currentUserData.description)
  fileList.value.forEach((file) => {
    formData.append('avatar', file.raw)
  })
  await callApi.put(`/users/update/${currentUserId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  authStore.fetchUserInfo()
  navigationId('Posts', currentUserId)
  ElNotification({
    title: 'Thành công',
    message: 'Cập nhật thông tin thành công!',
    type: 'success'
  })
}

onMounted(async () => {
  const userData = await callApi.get(`/users/${currentUserId}`)
  form.firstName = userData.firstName
  form.lastName = userData.lastName
  form.description = userData.description
  form.genders = `${userData.gender}`
})
</script>
<template>
  <div class="p-[60px]" style="height: calc(100vh - 80px)">
    <div class="bg-white px-6 py-12 border mb-8 flex items-center justify-between">
      <h1 class="font-bold text-2xl">Thông tin cá nhân</h1>
    </div>

    <div class="bg-white py-5 px-4 border mb-4">
      <el-form
        class="flex flex-col gap-3"
        ref="ruleFormRef"
        status-icon
        :model="form"
        @submit.prevent="submitUpdate"
      >
        <el-form-item prop="firstName" label="Tên">
          <InputBase type="text" placehoder="Tên" v-model="form.firstName" />
        </el-form-item>
        <el-form-item prop="firstName" label="Họ">
          <InputBase type="text" placehoder="Họ" v-model="form.lastName" />
        </el-form-item>
        <el-form-item prop="description" label="Giới tính">
          <el-radio-group v-model="form.genders" class="ml-4">
            <el-radio label="1" size="large">Nam</el-radio>
            <el-radio label="2" size="large">Nữ</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="description" label="Mô tả" class="mb-10">
          <el-input
            v-model="form.description"
            autocomplete="off"
            type="textarea"
            placeholder="Mô tả"
            class="description"
          />
        </el-form-item>

        <el-form-item prop="description" label="Ảnh đại diện">
          <div>
            <el-upload
              v-model:file-list="fileList"
              :auto-upload="false"
              list-type="picture-card"
              :limit="1"
              :on-change="handleChangeFile"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </div>
        </el-form-item>

        <el-form-item class="update-btn">
          <button
            class="bg-blue-600 px-5 py-2 rounded-2xl text-white"
            @submit.prevent="submitUpdate()"
          >
            Cập nhật
          </button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.el-form-item__label {
  width: 100px;
  justify-content: flex-start;
}
.description textarea {
  height: 200px;
}
.update-btn .el-form-item__content {
  justify-content: center;
}
</style>
