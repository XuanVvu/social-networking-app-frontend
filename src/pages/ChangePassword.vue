<script lang="ts" setup>
import { reactive, ref } from 'vue'
import InputBase from '@/components/base/InputBase.vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import useNavigation from '@/composables/useNavigation'
import callApi from '@/services/api'
import Button from '@/components/base/Button.vue'

export interface RuleChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ruleChangePasswordFormRef = ref<FormInstance | null>(null)
const { navigateTo } = useNavigation()
const isOpenDialogErrorLogin = ref<boolean>()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const rules = reactive<FormRules<RuleChangePasswordForm>>({
  currentPassword: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    {
      min: 6,
      message: 'Mật khẩu phải có ít nhất 6 kí tự',
      trigger: 'blur'
    }
  ],

  newPassword: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    {
      min: 6,
      message: 'Mật khẩu phải có ít nhất 6 kí tự',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: 'Vui lòng xác nhận mật khẩu', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.newPassword) {
          callback(new Error('Mật khẩu không khớp'))
        } else {
          callback()
        }
      }
    }
  ]
})

const submitUpdate = async () => {
  if (!ruleChangePasswordFormRef.value) {
    console.error('formEl is undefined')
    return
  }

  try {
    const valid = await ruleChangePasswordFormRef.value.validate()
    if (!valid) {
      return
    }

    const response = await callApi.put('/users/change-password', {
      oldPassword: form.currentPassword,
      newPassword: form.confirmPassword
    })

    if (response.data.status) {
      navigateTo('/login')
      ElNotification({
        title: 'Thành công',
        message: 'Đổi mật khẩu thành công!',
        type: 'success'
      })
    } else {
      isOpenDialogErrorLogin.value = true
      return
    }
  } catch (error) {
    console.error('Validation or API call failed:', error)
  }
}
</script>
<template>
  <div class="p-[60px]" style="height: calc(100vh - 80px)">
    <div class="bg-white px-6 py-12 border mb-8 flex items-center justify-between">
      <h1 class="font-bold text-2xl">Thông tin cá nhân</h1>
    </div>

    <div class="bg-white py-5 px-4 border mb-4">
      <el-form
        class="flex flex-col gap-3"
        ref="ruleChangePasswordFormRef"
        status-icon
        :model="form"
        :rules="rules"
        @submit.prevent="submitUpdate"
      >
        <el-form-item prop="currentPassword" label="Mật khẩu hiện tại">
          <InputBase
            type="password"
            placehoder="Mật khẩu hiện tại"
            v-model="form.currentPassword"
          />
        </el-form-item>
        <el-form-item prop="newPassword" label="Mật khẩu mới">
          <InputBase type="password" placehoder="Mật khẩu mới" v-model="form.newPassword" />
        </el-form-item>
        <el-form-item prop="confirmPassword" label="Xác nhận mật khẩu">
          <InputBase
            type="password"
            placehoder="Xác nhận mật khẩu"
            v-model="form.confirmPassword"
          />
        </el-form-item>

        <el-form-item class="update-btn">
          <button
            class="bg-blue-600 px-5 py-2 rounded-2xl text-white"
            @submit.prevent="submitUpdate(ruleChangePasswordFormRef)"
          >
            Cập nhật
          </button>
        </el-form-item>
      </el-form>

      <el-dialog v-model="isOpenDialogErrorLogin" width="50%" align-center class="rounded-lg p-8">
        <span class="my-8">Mật khẩu không chính xác. Vui lòng thử lại!</span>
        <template #footer>
          <span class="dialog-footer">
            <Button @click="isOpenDialogErrorLogin = false"> Ok </Button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss">
.el-form-item__label {
  width: 150px;
  justify-content: flex-start;
}
</style>
