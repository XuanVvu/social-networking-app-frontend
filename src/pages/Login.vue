<script setup lang="ts">
import Login from '@/assets/login-bg.jpg'
import { onMounted, reactive, ref, toRaw } from 'vue'
import { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import logo from "@/assets/logo.png"
import InputBase from '@/components/base/InputBase.vue'
import Button from '@/components/base/Button.vue'
import useNavigation from "@/composables/useNavigation"
import { useAuthStore } from '@/store/auth'

export interface RuleForm {
  email: string
  password: string
}
const formSize = ref<ComponentSize>('default')

const form = reactive({
  email: '',
  password: '',
  rememberCheckbox: false
})

const ruleFormRef = ref<FormInstance>()
const loginErrorData = ref<{ message: string; success: boolean }>()
const isOpenDialogErrorLogin = ref<boolean>()
const { navigateTo } = useNavigation()
const authStore = useAuthStore()

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    const valid = await formEl.validate()
    if (!valid) return;

    const user = toRaw(form);

    if (typeof authStore.login !== 'function') {
      console.error('authStore.login is not a function');
      return;
    }

    const response = await authStore.login(user.email || '', user.password || '');
    
    if (!response.data?.success) {
      loginErrorData.value = response.data;
      isOpenDialogErrorLogin.value = true;
      return;
    }

    navigateTo('/');
  } catch (error) {
    console.error('Login error:', error);
    loginErrorData.value = { message: 'Đã xảy ra lỗi khi đăng nhập', success: false };
    isOpenDialogErrorLogin.value = true;
  }
}
const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Vui lòng nhập đúng địa chỉ email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    {
      min: 6,
      message: 'Mật khẩu phải có ít nhất 6 kí tự',
      trigger: 'blur'
    }
  ]
})
const onCheckboxChange = (value: boolean) => {
  form.rememberCheckbox = value
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    navigateTo('/')
  }

})
</script>
<template>
  <div class="flex h-screen">
    <div class="flex w-full">
      <div class="hidden md:flex w-1/2 bg-blue-50 justify-center items-center">
        <div class="text-center">
          <img class="w-[250px] font-bold text-blue-600 relative top-[-70px] left-[-100px]" :src="logo" />


          <img :src="Login" alt="Login Illustration" class="max-w-sm mx-auto" />
        </div>
      </div>
      <div class="flex flex-col justify-center w-1/2 p-20">
        <h2 class="text-4xl font-bold mb-10">Đăng nhập tài khoản</h2>

        <el-form class="flex flex-col gap-3" ref="ruleFormRef" :rules="rules" :model="form" :size="formSize"
          status-icon>
          <el-form-item prop="email">
            <InputBase type="email" placehoder="Email" v-model="form.email" :icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <InputBase type="password" placehoder="Mật khẩu" v-model="form.password" :icon="Lock" />
          </el-form-item>
          <!-- <div class="flex justify-between items-center mb-6">
            <el-checkbox :value="form.rememberCheckbox" name="type" @change="onCheckboxChange">
              Simple brand exposure
            </el-checkbox>
            <a href="#" class="text-[#343a40] font-semibold">Forgot your Password?</a>
          </div> -->
          <el-form-item>
            <Button classFromParent="w-full py-6 py-2" @click="onSubmit(ruleFormRef)">
              Login
            </Button>
          </el-form-item>
          <div class="text-center">
            <p class="mb-4">
              Bạn chưa có tài khoản? <a href="/register" class="text-blue-600 font-semibold">Đăng ký</a>
            <div>{{ loginErrorData?.success }}</div>
            </p>
          </div>
        </el-form>
      </div>
    </div>
  </div>

  <el-dialog v-model="isOpenDialogErrorLogin" :title="loginErrorData?.message" width="50%" align-center
    class="rounded-lg p-8">
    <span class=" my-8">Email hoặc mật khẩu không chính xác. Vui lòng thử lại!</span>
    <template #footer>
      <span class="dialog-footer">
        <Button @click="isOpenDialogErrorLogin = false"> Ok </Button>
      </span>
    </template>
  </el-dialog>
</template>
