<script lang="ts" setup>
import Login from '@/assets/login-bg.jpg'
import { ComponentSize, FormInstance, FormRules } from 'element-plus';
import { ref, reactive } from 'vue';
import { Lock, User } from '@element-plus/icons-vue'
import logo from "@/assets/logo.png"
import InputBase from '@/components/base/InputBase.vue'
import Button from '@/components/base/Button.vue'
import useNavigation from '@/composables/useNavigation';
import { RuleForm } from './Login.vue';
const formSize = ref<ComponentSize>('default')

const form = reactive({
    email: '',
    password: '',
    rememberCheckbox: false
})

const ruleFormRef = ref<FormInstance>()
const { navigateTo } = useNavigation()
const onSubmit = () => {
    navigateTo('/login')
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
                <h2 class="text-4xl font-bold mb-10">Đăng ký</h2>

                <el-form class="flex flex-col gap-3" ref="ruleFormRef" :rules="rules" :model="form" :size="formSize"
                    status-icon>
                    <el-form-item prop="email">
                        <InputBase type="email" placehoder="Email" v-model="form.email" :icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <InputBase type="password" placehoder="Mật khẩu" v-model="form.password" :icon="Lock" />
                    </el-form-item>

                    <el-form-item>
                        <Button classFromParent="w-full py-6 py-2" @click="onSubmit()">
                            Đăng ký
                        </Button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>